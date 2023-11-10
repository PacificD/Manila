import { FC, useMemo } from 'react'
import { routes } from '@/routes'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home: FC = () => {
  const routeList = useMemo(
    () =>
      routes.reduce<string[]>(
        (routeList, route) =>
          route.path.length > 1 ? [...routeList, route.path] : routeList,
        []
      ),
    [routes]
  )

  return (
    <main className='min-w-[100vw] min-h-[100vh] py-12 flex flex-col items-center'>
      <span
        className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
 font-bold bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-7xl'
      >
        Manila
      </span>
      <section className='mt-4'>
        <main className='flex flex-col items-center'>
          {routeList.map(route => (
            <Link id={route} to={route} key={route} className='my-2'>
              <Button>/ {route.slice(1)}</Button>
            </Link>
          ))}
        </main>
      </section>
    </main>
  )
}

export default Home
