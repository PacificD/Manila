import { ChangeEvent, FC, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/copy-button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import useP2P, { RepresentTab } from './useP2P'


const P2P: FC = () => {
  const {
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
  } = useP2P()

  const [msgInput, setMsgInput] = useState('')
  const handleMsgInputChange = (e: ChangeEvent<HTMLInputElement>) => setMsgInput(e.currentTarget.value)

  const handleSendMsg = () => {
    sendMsg(msgInput)
    setMsgInput('')
  }

  return (
    <div className='flex flex-row gap-12 p-4 h-screen max-h-screen justify-between'>
      {/* remote screen */}
      <Card id='remote-stream-container h-full grow'>
        <CardHeader>
          <CardTitle className='text-center'>Remote Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <video ref={remoteVideoRef} autoPlay muted controls className='w-full h-full' />
        </CardContent>
      </Card>
      <div className='flex flex-col items-center gap-4 w-72 h-full'>
        <Tabs value={representTab} className='w-full grow'>
          <TabsList className='w-full'>
            {Object.entries(RepresentTab).map(([k, v]) => (
              <TabsTrigger
                key={k}
                value={v}
                onClick={() => activeRepresentTab(v)}
              >
                {v[0].toUpperCase() + v.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={RepresentTab.CALLER} className='w-full'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle className='text-center'>Caller</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col items-center gap-4'>
                <Button onClick={createOffer}>Create offer</Button>
                <div className='flex w-full justify-between items-center gap-2'>
                  <Input disabled value={offerSdp} />
                  <CopyButton value={offerSdp} />
                </div>
                <div className='flex w-full justify-between items-center gap-2'>
                  <Input
                    placeholder='Input the answer from callee'
                    value={answerSdpFromCallee}
                    onChange={handleAnswerSdpFromCalleeChange}
                  />
                  <Button onClick={addAnswer} className='whitespace-nowrap'>
                    Add answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent >
          <TabsContent value={RepresentTab.CALLEE} className='w-full'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle className='text-center'>Callee</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col w-full items-center gap-4'>
                <div className='flex w-full justify-between items-center gap-2'>
                  <Input
                    placeholder='Input the offer from caller'
                    value={offerSdpFromCaller}
                    onChange={handleOfferSdpFromCallerChange}
                  />
                  <Button onClick={createAnswer} className='whitespace-nowrap'>
                    Create answer
                  </Button>
                </div>
                <div className='flex w-full justify-between items-center gap-2'>
                  <Input disabled value={answerSdp} />
                  <CopyButton value={answerSdp} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Chat List */}
        <Card id='chat-list' className='w-full'>
          <CardHeader>
            <CardTitle className='text-center'>Chat List</CardTitle>
          </CardHeader>
          <CardContent className='w-full max-h-32 overflow-y-scroll'>
            {msgList.map((msg, idx) => <div id={idx + msg.type + msg.content} className='pb-3'>
              <span className={cn('rounded-md py-1 px-2 text-[10px] text-gray-600', msg.type === 'local' ? 'bg-teal-200' : 'bg-yellow-200')}>{msg.type}</span>
              <span className='ml-3'>{msg.content}</span>
            </div>)}
          </CardContent>
          <CardFooter className='flex items-center justify-between gap-2'>
            <Input value={msgInput} onChange={handleMsgInputChange} />
            <Button onClick={handleSendMsg}>Send</Button>
          </CardFooter>
        </Card>
        {/* local stream */}
        <Card id='local-stream-container' className='w-full'>
          <CardHeader>
            <CardTitle className='text-center'>Local Stream</CardTitle>
          </CardHeader>
          <CardContent className='w-full'>
            <video ref={localVideoRef} autoPlay controls muted />
          </CardContent>
          <CardFooter className='flex items-center justify-around'>
            <Button className='font-bold' onClick={init}>Start</Button>
            <Tooltip>
              <TooltipTrigger>
                <Switch checked={mediaStreamRecordType === 'display'} onCheckedChange={toggleMediaStreamRecordType} />
              </TooltipTrigger>
              <TooltipContent>
                <p>MediaStreamRecordType: {mediaStreamRecordType}</p>
              </TooltipContent>
            </Tooltip>
            <Button variant='outline' className='font-bold'>Puase</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default P2P
