import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DjPartyApp from './DjPartyApp.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <DjPartyApp />
      </BrowserRouter>
  </StrictMode>,
)
