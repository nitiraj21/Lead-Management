import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='text-xl font-bold pt-3'>Hello jiii</h2>
    </>
  )
}

export default App
