import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'webrtc-adapter'

import RouteElement from './routes'
import './index.css'
import { ThemeProvider } from '@/components/theme-provider'
import Menu from '@/components/menu'
import { TooltipProvider } from '@/components/ui/tooltip'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <div className='relative'>
            <Menu />
            <RouteElement />
            <Toaster position='top-center' richColors />
          </div>

        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
