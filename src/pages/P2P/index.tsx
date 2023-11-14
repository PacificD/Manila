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

const P2P: FC = () => {
  const {
    localVideoRef,
    remoteVideoRef,
    representTab,
    activeRepresentTab,
    offerSdp,
    answerSdp,
    createOffer
  } = useP2P()

  return (
    <div className='flex flex-row gap-12 p-4 min-h-screen justify-between'>
      {/* screen */}
      <div className='flex-[5] p-4 flex flex-col items-center justify-between'>
        <Card id='local-stream-container'>
          <CardHeader>
            <CardTitle>Local Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <video ref={localVideoRef} autoPlay muted />
          </CardContent>
          <CardFooter>
            <Button>Puase</Button>
          </CardFooter>
        </Card>
        <Card id='remote-stream-container'>
          <CardHeader>
            <CardTitle>Remote Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <video ref={remoteVideoRef} autoPlay muted />
          </CardContent>
          <CardFooter>
            <Button>Puase</Button>
          </CardFooter>
        </Card>
      </div>
      {/* step */}
      <Tabs value={representTab} className='flex-[3]'>
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
        <TabsContent value={RepresentTab.CALLER}>
          <Card>
            <CardHeader>
              <CardTitle>Caller</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={createOffer}>Create offer</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value={RepresentTab.CALLEE}>
          <Card>
            <CardHeader>
              <CardTitle>Callee</CardTitle>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default P2P
