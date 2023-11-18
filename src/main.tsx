import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'webrtc-adapter'

import RouteElement from './routes'
import './index.css'
import { ThemeProvider } from '@/components/theme-provider'
import Menu from '@/components/menu'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className='relative'>
          <Menu />
          <RouteElement />
          <Toaster position='top-center' richColors />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
