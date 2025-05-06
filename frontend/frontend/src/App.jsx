import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/user" element={<PrivateRoute role="USER"><UserDashboard/></PrivateRoute>}/>
          <Route path="/admin" element={<PrivateRoute role="ADMIN"><AdminDashboard/></PrivateRoute>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
