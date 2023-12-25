import { Coordinates, WindowState } from './types'
import { getWindowCenter } from './windowState'

export const baseChange = ({
  currentWindowOffset,
  targetWindowOffset,
  targetPosition
}: {
  currentWindowOffset: Coordinates
  targetWindowOffset: Coordinates
  targetPosition: Coordinates
}) => {
  const monitorCoordinate = {
    x: targetPosition.x + targetWindowOffset.x,
    y: targetPosition.y + targetWindowOffset.y
  }

  const currentWindowCoordinate = {
    x: monitorCoordinate.x - currentWindowOffset.x,
    y: monitorCoordinate.y - currentWindowOffset.y
  }

  return currentWindowCoordinate
}

export const drawMainCircle = (
  ctx: CanvasRenderingContext2D,
  center: Coordinates
) => {
  const { x, y } = center
  ctx.strokeStyle = '#eeeeee'
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.arc(x, y, 100, 0, Math.PI * 2, false)
  ctx.stroke()
  ctx.closePath()
}

export const drawConnectingLine = ({
  ctx,
  hostWindow,
  targetWindow
}: {
  ctx: CanvasRenderingContext2D
  hostWindow: WindowState
  targetWindow: WindowState
}) => {
  ctx.strokeStyle = '#ff0000'
  ctx.lineCap = 'round'
  const currentWindowOffset: Coordinates = {
    x: hostWindow.screenX,
    y: hostWindow.screenY
  }
  const targetWindowOffset: Coordinates = {
    x: targetWindow.screenX,
    y: targetWindow.screenY
  }
  const origin = getWindowCenter(hostWindow)
  const target = getWindowCenter(targetWindow)

  const targetWithBaseChange = baseChange({
    currentWindowOffset,
    targetWindowOffset,
    targetPosition: target
  })

  ctx.strokeStyle = '#ff0000'
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(origin.x, origin.y)
  ctx.lineTo(targetWithBaseChange.x, targetWithBaseChange.y)
  ctx.stroke()
  ctx.closePath()
}
