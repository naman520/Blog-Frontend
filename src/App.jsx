import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Navbar from './Pages/Navbar'
import Profile from './Pages/Profile'
import UpdateBlog from './Pages/UpdateBlog'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
        <Routes>
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleShowLogin={handleShowLogin} />} />
          <Route path='/blogadmin' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/profile' element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='newblog' element={<Blog isLoggedIn={isLoggedIn} />} />
          <Route path='register' element={<Register />} />
          <Route path='/updateBlog/:id' element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}