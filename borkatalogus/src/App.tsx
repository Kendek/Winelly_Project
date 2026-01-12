import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Map from './pages/Map'
import Webshop from './pages/Webshop'
import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Cart from './pages/Cart'

const App = () => {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/webshop" element={<Webshop />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App