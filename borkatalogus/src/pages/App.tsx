import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from './Home'
import Map from './Map'
import Webshop from './Webshop'
import Navbar from './Navbar'
import Login from './Login'
import Cart from './Cart'

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