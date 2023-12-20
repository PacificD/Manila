import { setFips } from 'crypto'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

interface IProps {
  count?: number
  container: MutableRefObject<HTMLDivElement | null>
}

class Snowflake {
  x = 0
  y = 0
  vy = 0
  vx = 0
  r = 0
  o = 0
  reset(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * -height
    this.vy = 0.5 + Math.random()
    this.vx = 0.3 - Math.random()
    this.r = 1 + Math.random() * 2
    this.o = 0.5 + Math.random() * 0.5
  }
}

const useSnowflakes = ({ count = 300, container }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const snowflakes = useRef<Snowflake[]>([])
  const shimRequestAnimationFrame = useMemo(
    () =>
      (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback: () => void) {
            window.setTimeout(callback, 1000 / 60)
          }
        )
      })(),
    []
  )

  const onResize = () => {
    if (!canvasRef.current || !container.current || !ctxRef.current) return
    const containerWidth = container.current.clientWidth
    canvasRef.current.width = containerWidth
    canvasRef.current.height = container.current.clientHeight
    ctxRef.current.fillStyle = '#fff'
    update()
  }

  const init = () => {
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas')
      canvasRef.current = canvas
      canvasRef.current.style.position = 'absolute'
      canvasRef.current.style.top = '0'
      ctxRef.current = canvas.getContext('2d')
    }
    const [width, height] = [
      container.current?.clientWidth,
      container.current?.clientHeight
    ]
    for (let i = 0; i < count; ++i) {
      const snowflake = new Snowflake()
      snowflake.reset(width!, height!)
      snowflakes.current.push(snowflake)
    }
    container.current!.appendChild(canvasRef.current)
    onResize()
  }

  const update = () => {
    if (!canvasRef.current || !ctxRef.current) return
    const width = container.current!.clientWidth
    const height = container.current!.clientHeight
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, width, height)
    // console.log(snowflakes.current[0].y)
    snowflakes.current.forEach(snowflake => {
      snowflake.x += snowflake.vx
      snowflake.y += snowflake.vy

      ctx.globalAlpha = snowflake.o
      ctx.beginPath()
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()

      if (snowflake.y > height) snowflake.reset(width, height)
    })

    shimRequestAnimationFrame(update)
  }

  useEffect(() => {
    init()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
}

export default useSnowflakes
