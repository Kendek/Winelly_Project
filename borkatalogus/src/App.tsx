import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Map from './pages/Map'
import Webshop from './pages/Webshop'
import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Cart from './pages/Cart'
import CurrentWine from './Mcomponents/CurrentWine'

const App = () => {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/webshop" element={<Webshop />} />
        <Route path="/currentWine" element={<CurrentWine/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App