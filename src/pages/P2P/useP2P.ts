import { ChangeEvent, ElementRef, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export const RepresentTab = {
  CALLER: 'caller',
  CALLEE: 'callee'
} as const

type RepresentTab = (typeof RepresentTab)[keyof typeof RepresentTab]

const useP2P = () => {
  const peerConnectionRef = useRef<RTCPeerConnection>()
  const localVideoRef = useRef<ElementRef<'video'>>(null)
  const remoteVideoRef = useRef<ElementRef<'video'>>(null)
  const localStream = useRef<MediaStream | null>(null)
  const remoteStream = useRef<MediaStream | null>(null)
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

  const init = async () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.voipbuster.com ' }]
    })
    const pc = peerConnectionRef.current
    if (!pc) toast.error('Something went wrong!')
    localStream.current = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    })
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

  useEffect(() => {
    init()
  }, [])

  return {
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
    addAnswer
  }
}

export default useP2P
