import { FC } from 'react'
import CanvasProcessGraph from './Canvas'
import SVGProcessGraph from './SVG'

const ProcessGraph: FC = () => {
  return (
    <div className='flex gap-16 pt-24 px-16 h-full w-full'>
      <CanvasProcessGraph />
      <SVGProcessGraph />
    </div>
  )
}

export default ProcessGraph
