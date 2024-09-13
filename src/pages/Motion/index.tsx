import { Separator } from '@/components/ui/separator'
import FadeTextAnimation from './FadeTextAnimation'
import VSlideTextAnimation from './VSlideTextAnimation'

const Motion = () => {
  return (
    <div className='m-32'>
      <VSlideTextAnimation />
      <Separator />
      <FadeTextAnimation />
    </div>
  )
}

export default Motion
