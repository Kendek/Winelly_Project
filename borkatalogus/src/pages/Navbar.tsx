import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "../Navbar.module.css"

const Navbar = () => {

    const[currentPage, setCurrentPage] = useState<"home" | "map" | "webshop" | "login" | "cart">("home")

  return (
    <nav className={styles.navbar} >
        <div className={styles.navbarleft}>
            <Link to="/" onClick={()=> setCurrentPage("home")}><img src="./logo.png" alt="" className={styles.logo} /></Link>
        </div>
        <div className={styles.navbarcenter}>
            <ul className={styles.navlinks}>
            <li>
                 <Link to="/" className={currentPage=="home" ? styles.pageLinkshome : styles.pageLinks} onClick={()=> setCurrentPage("home")}>Home</Link>
            </li>
            <li>
                <Link to="/map" className={currentPage=="map" ? styles.pageLinksmap : styles.pageLinks} onClick={()=> setCurrentPage("map")}>Map</Link>
            </li>
            <li>
                <Link to="/webshop" className={currentPage=="webshop" ? styles.pageLinkswebshop : styles.pageLinks} onClick={()=> setCurrentPage("webshop")}>Webshop</Link>
            </li>
            </ul>
        </div>
         <div className={styles.navbarright}>
            <Link to="/login" className={currentPage=="login" ? styles.usericonlogin : styles.usericon} onClick={()=> setCurrentPage("login")}>Login</Link>
            <Link to="/cart" className={currentPage=="cart" ? styles.carticonactive : styles.carticon} onClick={()=> setCurrentPage("cart")}><i className="fa-solid fa-cart-shopping"></i></Link>
        </div>
    </nav>
  )
}

export default Navbar