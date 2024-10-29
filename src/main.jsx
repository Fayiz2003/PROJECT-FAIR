import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './contexts/ContextShare.jsx'
import Authcontext from './contexts/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authcontext>
      <ContextShare> 
        <BrowserRouter> <App /> </BrowserRouter>
      </ContextShare>
    </Authcontext>
  </StrictMode>,
)
