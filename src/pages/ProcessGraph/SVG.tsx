import { FC, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SVGProcessGraph: FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-center'>SVG</CardTitle>
      </CardHeader>
      <CardContent>
        <svg width='800' height='600' ref={svgRef}>
          <g>
            <path
              d='M 320 110 C 286 110, 286 160, 320 160 L 370 160 C 404 160, 404 110, 370 110 Z'
              stroke='#82b366'
              strokeWidth='2'
              fill='#d5e8d4'
            />
            <text x='332' y='140' style={{ fontSize: 12 }}>
              Start
            </text>
          </g>
          <g>
            <rect
              x='295'
              y='235'
              width='100'
              height='50'
              rx='5'
              fill='#dae8fc'
              stroke='#6c8ebf'
              strokeWidth='2'
            ></rect>
            <text x='330' y='264' style={{ fontSize: 12 }}>
              Task
            </text>
          </g>
          <g>
            <path
              d='M 320 360 C 286 360, 286 410, 320 410 L 370 410 C 404 410, 404 360, 370 360 Z'
              stroke='#82b366'
              strokeWidth='2'
              fill='#d5e8d4'
            />
            <text x='332' y='390' style={{ fontSize: 12 }}>
              End
            </text>
          </g>
          <g>
            <path
              d='M 345 160 L 345 235'
              stroke='#000'
              stroke-width='2'
              stroke-dasharray='5'
              className='animate-process-graph-line-dashdraw'
            ></path>
            <path
              d='M 340 225 L 345 228 L 350 225 L 345 235 Z'
              fill='#000'
              stroke='black'
            ></path>
          </g>
          <g>
            <path
              d='M 345 285 L 345 360'
              stroke='#000'
              stroke-width='2'
              stroke-dasharray='5'
              className='animate-process-graph-line-dashdraw'
            ></path>
            <path
              d='M 340 350 L 345 353 L 350 350 L 345 360 Z'
              fill='#000'
            ></path>
          </g>
        </svg>
      </CardContent>
    </Card>
  )
}

export default SVGProcessGraph
