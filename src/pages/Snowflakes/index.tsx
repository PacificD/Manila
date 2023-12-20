import { FC, useRef } from 'react'
import useSnowflakes from './useSnowflakes'

const Snowflakes: FC = () => {
  const container = useRef<HTMLDivElement | null>(null)
  useSnowflakes({ container, count: 100 })

  return (
    <section
      id='sky'
      ref={container}
      className='w-screen h-screen m-0 p-0 bg-[#235E6F]'
    >
      <div className='flex justify-center items-center w-full h-full'>
        <p className='text-gray-100 font-bold text-lg tracking-wide'>#235E6F</p>
      </div>
    </section>
  )
}

export default Snowflakes
