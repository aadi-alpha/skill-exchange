import React from 'react'

import { Route,Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './Login'
import Register from './Register'


const App = () => {

  
  return (
    <>
    <Routes >
      <Route path='/' element={<LandingPage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />} ></Route>
    </Routes>
    </>

  )
}

export default App
