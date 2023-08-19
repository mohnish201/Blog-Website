import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNotes from './AllNotes'
import Home from './Home'
import Login from './Login'
import Register from './Register'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<AllNotes />} />
    </Routes>
  )
}

export default AllRoutes