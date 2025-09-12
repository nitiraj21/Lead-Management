import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/register'
import Signin from './pages/signin'
import Home from './pages/lead'
import CreateLead from './pages/CreateLead'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-lead' element={<CreateLead/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
