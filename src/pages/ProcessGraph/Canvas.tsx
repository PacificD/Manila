import { FC, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.setLineDash([])
  ctx.lineDashOffset = 0

  ctx.beginPath()
  ctx.arc(300, 125, 25, Math.PI / 2, (Math.PI * 3) / 2, false)
  ctx.lineTo(350, 100)
  ctx.arc(350, 125, 25, (Math.PI * 3) / 2, (Math.PI * 5) / 2, false)
  ctx.lineTo(300, 150)
  ctx.strokeStyle = '#82b366'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = '#d5e8d4'
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.fillText('Start', 312, 130)

  ctx.beginPath()
  ctx.arc(280, 230, 5, Math.PI, (Math.PI * 3) / 2, false)
  ctx.lineTo(370, 225)
  ctx.arc(370, 230, 5, (Math.PI * 3) / 2, Math.PI * 2, false)
  ctx.lineTo(375, 270)
  ctx.arc(370, 270, 5, 0, Math.PI / 2, false)
  ctx.lineTo(280, 275)
  ctx.arc(280, 270, 5, Math.PI / 2, Math.PI, false)
  ctx.lineTo(275, 230)
  ctx.lineWidth = 3
  ctx.strokeStyle = '#6c8ebf'
  ctx.stroke()
  ctx.fillStyle = '#dae8fc'
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.fillText('Task', 310, 254)

  ctx.beginPath()
  ctx.arc(300, 400, 25, Math.PI / 2, (Math.PI * 3) / 2, false)
  ctx.lineTo(350, 375)
  ctx.arc(350, 400, 25, (Math.PI * 3) / 2, (Math.PI * 5) / 2, false)
  ctx.lineTo(300, 425)
  ctx.lineWidth = 3
  ctx.strokeStyle = '#82b366'
  ctx.stroke()
  ctx.fillStyle = '#d5e8d4'
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.fillText('End', 312, 405)

  ctx.beginPath()
  ctx.moveTo(325, 150)
  ctx.lineTo(325, 225)
  ctx.lineWidth = 1
  ctx.strokeStyle = '#000'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(320, 215)
  ctx.lineTo(330, 215)
  ctx.lineTo(325, 225)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(325, 275)
  ctx.lineTo(325, 375)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(320, 365)
  ctx.lineTo(330, 365)
  ctx.lineTo(325, 375)
  ctx.fill()
}

const drawAnimateLine = (ctx: CanvasRenderingContext2D, offset: number) => {
  ctx.clearRect(324, 150, 2, 67)
  ctx.clearRect(324, 275, 2, 67)

  ctx.beginPath()
  ctx.moveTo(325, 150)
  ctx.lineTo(325, 223)
  ctx.setLineDash([4, 4])
  ctx.lineDashOffset = -offset
  ctx.lineWidth = 1.5
  ctx.strokeStyle = '#000'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(325, 275)
  ctx.lineTo(325, 348)
  ctx.stroke()
}

const rAFSetInterval = (handler: (timer: number) => void, timeout: number) => {
  let timer: number | null = null
  let startTime = Date.now()
  const loop = () => {
    const currentTime = Date.now()
    if (currentTime - startTime >= timeout) {
      startTime = currentTime
      timer && handler(timer)
    }
    timer = requestAnimationFrame(loop)
  }
  loop()
  return timer
}

const CanvasProcessGraph: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas?.getContext) {
      const ratio = window.devicePixelRatio || 1
      const { width, height } = canvas
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.scale(ratio, ratio)
      ctx.font = '12px sans-serif'

      const run = () => {
        offsetRef.current++
        if (offsetRef.current > 1000) {
          offsetRef.current = 0
        }
        drawAnimateLine(ctx, offsetRef.current)
      }

      draw(canvas, ctx)
      rAFSetInterval(run, 50)
    }
  }, [])

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-center'>Canvas</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} id='canvas' width='400' height='300'></canvas>
      </CardContent>
    </Card>
  )
}

export default CanvasProcessGraph
