import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import YWebrtcTest from './components/YWebrtcTest';
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <YWebrtcTest/>
  </StrictMode>,
)
