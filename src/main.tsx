import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import YWebrtcTest from './components/YWebrtcTest';
import CollabEditor from "./components/CollabEditor.tsx";
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CollabEditor/>
  </StrictMode>,
)
