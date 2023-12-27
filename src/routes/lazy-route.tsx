import { FC, LazyExoticComponent, Suspense } from 'react'

const lazyRoute = (Comp: LazyExoticComponent<FC>) => {
  return (
    <Suspense>
      <Comp />
    </Suspense>
  )
}

export default lazyRoute
