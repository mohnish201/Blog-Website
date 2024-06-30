import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Private_Route = ({ children }) => {

  const isAuth = localStorage.getItem("token")

  if (!isAuth) {
    return <Navigate to='/login' />
  }
  return children
}

export default Private_Route