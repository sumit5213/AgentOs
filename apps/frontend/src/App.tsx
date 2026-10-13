import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [ws, setWS] = useState(new WebSocket("ws://localhost:3000"))

  useEffect(()=>{
    ws.onopen=()=>{
      if(ws){
        ws.send("hii there")
      }
    }
  },[ws])

  return (
    
    <>
      hii there from app
    </>
  )
}

export default App
