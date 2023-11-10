import { NotFound, Home } from '@/pages'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const RecordScreen = lazy(() => import('@/pages/RecordScreen')),
  GSAP = lazy(() => import('@/pages/GSAP'))

export const routes = [
  {
    path: '/',
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
  }
]

const RouteElement: React.FC = () => useRoutes(routes)

export default RouteElement
