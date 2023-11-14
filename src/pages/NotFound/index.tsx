import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound: FC = () => {
  return (
    <div className='flex flex-col items-center w-full h-full py-12'>
      <div>NotFound</div>
      <Button asChild>
        <Link to='/home'>back to homeScreen</Link>
      </Button>
    </div>
  )
}

export default NotFound
