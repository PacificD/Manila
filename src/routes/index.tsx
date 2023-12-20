import { NotFound, Home, P2P } from '@/pages'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const RecordScreen = lazy(() => import('@/pages/RecordScreen')),
  GSAP = lazy(() => import('@/pages/GSAP')),
  Snowflakes = lazy(() => import('@/pages/Snowflakes'))

export const routes = [
  {
    path: '/',
    element: <P2P />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/record-screen',
    element: (
      <Suspense>
        <RecordScreen />
      </Suspense>
    )
  },
  {
    path: '/motion',
    element: (
      <Suspense>
        <GSAP />
      </Suspense>
    )
  },
  {
    path: '/snowflakes',
    element: <Suspense>
      <Snowflakes />
    </Suspense>
  }
]

const RouteElement: React.FC = () => useRoutes(routes)

export default RouteElement
