import { NotFound, Home, P2P } from '@/pages'
import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import lazyRoute from './lazy-route'

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
    element: lazyRoute(lazy(() => import('@/pages/RecordScreen')))
  },
  {
    path: '/snowflakes',
    element: lazyRoute(lazy(() => import('@/pages/Snowflakes')))
  },
  {
    path: '/shared-worker',
    element: lazyRoute(lazy(() => import('@/pages/SharedWorker')))
  }
]

const RouteElement: React.FC = () => useRoutes(routes)

export default RouteElement
