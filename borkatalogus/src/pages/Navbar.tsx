import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "../Navbar.module.css"

const Navbar = () => {

    const location = useLocation();

    const [currentPage, setCurrentPage] = useState<"home" | "map" | "webshop" | "login" | "cart">("home");

    useEffect(() => {
    switch(location.pathname) 
    {
        case "/home":
        setCurrentPage("home");
        break;
        case "/map":
        setCurrentPage("map");
        break;
        case "/webshop":
        setCurrentPage("webshop");
        break;
        case "/login":
        setCurrentPage("login");
        break;
        case "/cart":
        setCurrentPage("cart");
        break;
        default:
        setCurrentPage("home");
        }
    }, [location.pathname])

    const[clicked, setClikced] = useState(false)

    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth > 768) {
        setClikced(false);
        }
    };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <nav className={styles.navbar} >
        <div className={styles.navbarleft}>
            <Link to="/home" onClick={()=> setCurrentPage("home")}><img src="./logo.png" alt="" className={styles.logo} /></Link>
        </div>
        <div className={styles.navbarcenter}>
            <ul className={clicked ? styles.navlinksActive : styles.navlinks}>
            <li>
                 <Link to="/home" className={currentPage=="home" ? styles.pageLinkactive : styles.pageLink} onClick={()=> setCurrentPage("home")}>Home</Link>
            </li>
            <li>
                <Link to="/map" className={currentPage=="map" ? styles.pageLinkactive : styles.pageLink} onClick={()=> setCurrentPage("map")}>Map</Link>
            </li>
            <li>
                <Link to="/webshop" className={currentPage=="webshop" ? styles.pageLinkactive : styles.pageLink} onClick={()=> setCurrentPage("webshop")}>Webshop</Link>
            </li>
            </ul>
        </div>
         <div className={styles.navbarright}>
            <Link to="/login" className={currentPage=="login" ? styles.usericonlogin : styles.usericon} onClick={()=> setCurrentPage("login")}>Login</Link>
            <Link to="/cart" className={currentPage=="cart" ? styles.carticonactive : styles.carticon} onClick={()=> setCurrentPage("cart")}><i className="fa-solid fa-cart-shopping"></i></Link>
            <div className={styles.mobile}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"} onClick={() => setClikced(!clicked)}></i>
            </div>
        </div>
    </nav>
  )
}

export default Navbar