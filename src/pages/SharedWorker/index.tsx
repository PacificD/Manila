import { FC, useEffect } from 'react'

import { getWindowCenter } from './windowState'
import { WindowWorkerHandler } from './workerHandler'
import { drawConnectingLine, drawMainCircle } from './draw'

function main() {
  const workerHandler = new WindowWorkerHandler()
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const currentWindow = workerHandler.currentWindow
  const currentId = workerHandler.id
  const center = getWindowCenter(currentWindow)

  workerHandler.onSync(windows => {
    ctx.reset()
    drawMainCircle(ctx, center)
    windows
      .filter(w => w.id !== currentId)
      .forEach(({ windowState: targetWindow }) => {
        drawConnectingLine({
          ctx,
          hostWindow: workerHandler.currentWindow,
          targetWindow
        })
      })
  })

  setInterval(() => {
    workerHandler.windowHasChanged()
  }, 100)
}

const SharedWorkerScreen: FC = () => {
  useEffect(() => {
    main()
  }, [])

  return (
    <div className='w-full h-full bg-gray-700'>
      <canvas id='canvas' />
    </div>
  )
}

export default SharedWorkerScreen
