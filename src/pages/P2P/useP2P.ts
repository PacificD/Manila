import { ChangeEvent, ElementRef, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export interface IMsg {
  type: 'local' | 'remote'
  content: string
}

export const RepresentTab = {
  CALLER: 'caller',
  CALLEE: 'callee'
} as const

type RepresentTab = (typeof RepresentTab)[keyof typeof RepresentTab]

export const MediaStreamRecordType = {
  USER: 'user',
  DISPLAY: 'display'
} as const

type MediaStreamRecordType = (typeof MediaStreamRecordType)[keyof typeof MediaStreamRecordType]

const useP2P = () => {
  const peerConnectionRef = useRef<RTCPeerConnection>()
  const dataCannelRef = useRef<RTCDataChannel>()
  const localVideoRef = useRef<ElementRef<'video'>>(null)
  const remoteVideoRef = useRef<ElementRef<'video'>>(null)
  const localStream = useRef<MediaStream | null>(null)
  const [msgList, setMsgList] = useState<IMsg[]>([])
  const [offerSdp, setOfferSdp] = useState('')
  const [answerSdp, setAnswerSdp] = useState('')
  const [offerSdpFromCaller, setOfferSdpFromCaller] = useState('')
  const [answerSdpFromCallee, setAnserSdpFromCallee] = useState('')
  const handleOfferSdpFromCallerChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOfferSdpFromCaller(e.currentTarget.value)
  const handleAnswerSdpFromCalleeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAnserSdpFromCallee(e.currentTarget.value)

  const [representTab, setRepresentTab] = useState<RepresentTab>(
    RepresentTab.CALLER
  )
  const activeRepresentTab = (v: RepresentTab) => setRepresentTab(v)

  const [mediaStreamRecordType, setMediaStreamRecordType] = useState<MediaStreamRecordType>('display')
  const toggleMediaStreamRecordType = () => setMediaStreamRecordType(mediaStreamRecordType => mediaStreamRecordType === 'display' ? 'user' : 'display')

  const init = async () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.voipbuster.com ' }]
    })
    const pc = peerConnectionRef.current
    if (!pc) toast.error('Something went wrong!')

    // create RTCDataChannel
    const dataCannel = pc.createDataChannel('chatList', {
      negotiated: true,
      id: 0
    })
    dataCannelRef.current = dataCannel

    // set local video stream
    const mediaStreamOptions: MediaStreamConstraints = {
      video: true,
      audio: false
    }
    localStream.current = await (mediaStreamRecordType === 'display' ? navigator.mediaDevices.getDisplayMedia(mediaStreamOptions)
      : navigator.mediaDevices.getUserMedia(mediaStreamOptions))
    localVideoRef.current!.srcObject = localStream.current
    localStream.current.getTracks().forEach(track => {
      pc.addTrack(track, localStream.current as MediaStream)
    })

    pc.ontrack = (event: RTCTrackEvent) => {
      remoteVideoRef.current!.srcObject = event.streams[0]
    }
  }

  const createOffer = async () => {
    const pc = peerConnectionRef.current
    if (!pc) {
      toast.error('PeerConnection not established!')
      return
    }
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    pc.onicecandidate = async event => {
      if (event.candidate) {
        setOfferSdp(JSON.stringify(pc.localDescription))
      }
    }
  }

  const createAnswer = async () => {
    const pc = peerConnectionRef.current
    if (!pc) {
      toast.error('PeerConnection is not established!')
      return
    }
    const offer = JSON.parse(offerSdpFromCaller)
    pc.onicecandidate = async event => {
      if (event.candidate) {
        setAnswerSdp(JSON.stringify(pc.localDescription))
      }
    }
    await pc.setRemoteDescription(offer)
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
  }

  const addAnswer = async () => {
    const pc = peerConnectionRef.current
    if (!pc) {
      toast.error('PeerConnection not established!')
      return
    }
    const answer = JSON.parse(answerSdpFromCallee)
    if (!pc.currentRemoteDescription) {
      pc.setRemoteDescription(answer)
    }
  }

  const sendMsg = (content: string) => {
    const msg: IMsg = {
      type: 'local',
      content
    }
    dataCannelRef.current?.send(JSON.stringify(msg))
    setMsgList(msgList => [...msgList, msg])
  }

  useEffect(() => {
    if (dataCannelRef.current) {
      dataCannelRef.current.onopen = (e) => {
        console.log('🚀 RTCDataChannel onopen, ', e)
      }

      dataCannelRef.current.onerror = (e) => {
        toast.error('RTCDataChannel error occur!')
        console.error(e)
      }

      dataCannelRef.current.onmessage = (e) => {
        e.data && setMsgList(msgList => [...msgList, {
          type: 'remote',
          content: JSON.parse(e.data)?.content || ''
        }])
      }
    } else toast.error('RTCDataChannel closed!')
  }, [dataCannelRef.current])

  return {
    init,
    localVideoRef,
    remoteVideoRef,
    representTab,
    activeRepresentTab,
    offerSdp,
    answerSdp,
    createOffer,
    createAnswer,
    offerSdpFromCaller,
    handleOfferSdpFromCallerChange,
    answerSdpFromCallee,
    handleAnswerSdpFromCalleeChange,
    addAnswer,
    msgList,
    sendMsg,
    mediaStreamRecordType,
    toggleMediaStreamRecordType
  }
}

export default useP2P
