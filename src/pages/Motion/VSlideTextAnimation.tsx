import { useEffect, useRef, useState } from 'react'
import { gsap, Elastic } from 'gsap'
import { Button } from '@/components/ui/button'

const VSlideTextAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const LINE_HEIGHT = 50
  const TOTAL = 6

  useEffect(() => {
    if (!listRef.current) return
    gsap.killTweensOf(listRef.current)
    const vSlideController = gsap.timeline({ paused: true })
    const targetY = activeIndex * -1 * LINE_HEIGHT

    vSlideController.to(listRef.current, 1, {
      y: targetY,
      ease: Elastic.easeOut.config(1, 0.4)
    })

    vSlideController.play()
  }, [activeIndex])

  const onPrevClick = () => {
    if (activeIndex === 0) {
      gsap.set(listRef.current, { y: TOTAL * -1 * LINE_HEIGHT })
      setActiveIndex(TOTAL - 1)
    } else setActiveIndex(prev => prev - 1)
  }
  const onNextClick = () => {
    if (activeIndex === TOTAL - 1) {
      gsap.set(listRef.current, { y: -1 * -1 * LINE_HEIGHT })
      setActiveIndex(0)
    } else setActiveIndex(prev => prev + 1)
  }

  return (
    <div className='m-32'>
      <div className='h-12 overflow-hidden border border-blue-400'>
        <ul className='list-none p-0 text-center' ref={listRef}>
          <li className='text-2xl leading-[50px] text-blue-500'>Websites</li>
          <li className='text-2xl leading-[50px] text-blue-500'>Plugins</li>
          <li className='text-2xl leading-[50px] text-blue-500'>Web Apps</li>
          <li className='text-2xl leading-[50px] text-blue-500'>Portals</li>
          <li className='text-2xl leading-[50px] text-blue-500'>Communities</li>
          <li className='text-2xl leading-[50px] text-blue-500'>
            Digital Marketing
          </li>
        </ul>
      </div>
      <div className='mt-8 flex items-center justify-center gap-8'>
        <Button onClick={onPrevClick}>&lt;</Button>
        <Button onClick={onNextClick}>&gt;</Button>
      </div>
    </div>
  )
}

export default VSlideTextAnimation
