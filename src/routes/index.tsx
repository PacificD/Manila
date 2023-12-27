import { NotFound, Home, P2P } from '@/pages'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const RecordScreen = lazy(() => import('@/pages/RecordScreen')),
  Snowflakes = lazy(() => import('@/pages/Snowflakes')),
  SharedWorker = lazy(() => import('@/pages/SharedWorker'))

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
    path: '/snowflakes',
    element: (
      <Suspense>
        <Snowflakes />
      </Suspense>
    )
  },
  {
    path: '/shared-worker',
    element: (
      <Suspense>
        <SharedWorker />
      </Suspense>
    )
  }
]

const RouteElement: React.FC = () => useRoutes(routes)

export default RouteElement
