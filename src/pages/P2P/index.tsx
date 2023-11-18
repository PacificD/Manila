import { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import useP2P, { RepresentTab } from './useP2P'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyButton } from '@/components/copy-button'
import { Input } from '@/components/ui/input'

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
    addAnswer
  } = useP2P()

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
      <div className='flex flex-col items-center justify-between w-72 h-full'>
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
        {/* local stream */}
        <Card id='local-stream-container w-full'>
          <CardHeader>
            <CardTitle className='text-center'>Local Stream</CardTitle>
          </CardHeader>
          <CardContent className='w-full'>
            <video ref={localVideoRef} autoPlay controls muted />
          </CardContent>
          <CardFooter className='flex items-center justify-around'>
            <Button className='font-bold' onClick={init}>Start</Button>
            <Button variant='outline' className='font-bold'>Puase</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default P2P
