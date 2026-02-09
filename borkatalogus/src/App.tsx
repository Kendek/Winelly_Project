import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Map from './pages/Map'
import Webshop from './pages/Webshop'
import Navbar from './pages/Navbar'
import Login from './pages/Login'
import Cart from './pages/Cart'
import CurrentWine from './Mcomponents/CurrentWine'
import WineContextProvider from './Mcontext/WineContextProvider'
import Checkout from './pages/Checkout'
import Done from './pages/Done'
import Review from './pages/Review'
import AdminAccounts from './Ksrc/AdminPages/AdminAccounts'
import AdminGrape from './Ksrc/AdminPages/AdminGrape'
import AdminWine from './Ksrc/AdminPages/AdminWine'
import AdminWinery from './Ksrc/AdminPages/AdminWinery'
const App = () => {

  const cartIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("visited")) {
      localStorage.removeItem("discount");
      localStorage.removeItem("discountCode");
      localStorage.removeItem("cart");
      localStorage.removeItem("email");
      localStorage.removeItem("finalPrice");


      sessionStorage.setItem("visited", "true");
    }
  }, []);


  return (
    <WineContextProvider>
      <BrowserRouter>
        <Navbar cartIconRef={cartIconRef} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/webshop" element={<Webshop cartIconRef={cartIconRef} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/done" element={<Done />} />
          <Route path="/review" element={<Review />} />
          <Route path="/adminaccounts" element={<AdminAccounts/>} />
          <Route path="/adminGrape" element={<AdminGrape/>} />
          <Route path="/adminWine" element={<AdminWine/>} />
          <Route path="/adminWinery" element={<AdminWinery/>} />

        </Routes>
      </BrowserRouter>
    </WineContextProvider>
  )
}

export default App