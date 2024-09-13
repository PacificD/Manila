import { useEffect, useRef, useState } from 'react'
import { gsap, Elastic } from 'gsap'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { easeString } from '@/const/gsap-ease-string'

const list = [
  'Websites',
  'Plugins',
  'Web Apps',
  'Portals',
  'Communities',
  'Digital Marketing'
]

const TOTAL = list.length

const FadeTextAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const textRef = useRef<HTMLLIElement>(null)
  const [selectedEase, setSelectedEase] = useState(easeString[17])
  const [duration, setDuration] = useState(0.4)
  const [delay, setDelay] = useState(0.05)

  const onPrevClick = () => {
    setActiveIndex(prev => (prev === 0 ? TOTAL - 1 : prev - 1))
  }

  const onNextClick = () => {
    setActiveIndex(prev => (prev === TOTAL - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        { opacity: 1, delay, duration, ease: selectedEase }
      )
    }
  }, [activeIndex, duration, selectedEase, delay])

  return (
    <div className='m-32'>
      <div className='h-12 overflow-hidden border border-blue-400'>
        <ul className='relative list-none p-0 text-center' ref={listRef}>
          <li
            ref={textRef}
            className='absolute left-0 top-0 w-full text-2xl leading-[50px] text-blue-500'
          >
            {list[activeIndex]}
          </li>
        </ul>
      </div>
      <div className='my-8 flex items-center justify-center gap-8'>
        <Button onClick={onPrevClick}>&lt;</Button>
        <Button onClick={onNextClick}>&gt;</Button>
      </div>
      {/* controller */}
      <div className='flex items-start justify-between gap-16'>
        <div className='flex-1'>
          <h4 className='mb-4 text-xl'>EaseString:</h4>
          <Select onValueChange={v => setSelectedEase(v)} value={selectedEase}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='easeString' />
            </SelectTrigger>
            <SelectContent>
              {easeString.map(item => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex-1'>
          <h4 className='mb-8 text-xl'>
            Duration: &nbsp;<span className='text-indigo-400'>{duration}</span>
          </h4>
          <Slider
            value={[duration]}
            // defaultValue={[duration]}
            max={10}
            step={0.1}
            onValueChange={v => setDuration(v[0])}
            className={cn('w-full')}
          />
        </div>
        <div className='flex-1'>
          <h4 className='mb-8 text-xl'>
            Delay: &nbsp;<span className='text-teal-400'>{delay}</span>
          </h4>
          <Slider
            value={[delay]}
            // defaultValue={[duration]}
            max={4}
            step={0.01}
            onValueChange={v => setDelay(v[0])}
            className={cn('w-full')}
          />
        </div>
      </div>
    </div>
  )
}

export default FadeTextAnimation
