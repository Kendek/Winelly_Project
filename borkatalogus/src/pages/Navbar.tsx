import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from "../Navbar.module.css"
import { WineContext } from '../Mcontext/WineContextProvider';
import MiniNavbarStepper from '../Stepper/MiniNavbarStepper';

const Navbar = () => {

    //UseState + Location
    const location = useLocation();
    const [clicked, setClikced] = useState(false)
    const { setCurrentWineId } = useContext(WineContext)
    /*----------*/

    //Navbar responsivity
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setClikced(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        window.scrollTo({ top: 0, });
    }, [location.pathname]);
    /*----------*/

    useEffect(() => {
        setCurrentWineId(null);
    }, [location]);

    const getCurrentStep = () => {
        if (location.pathname === "/cart") return 1;
        if (location.pathname === "/checkout") return 2;
        if (location.pathname === "/done") return 3;
        return 0;
    };

    const currentStep = getCurrentStep();



    return (
        <nav className={styles.navbar} >
            <div className={styles.navbarleft}>
                <Link to="/home"><img src="./logo.png" alt="" className={styles.logo} /></Link>
            </div>
            <div className={currentStep ? styles.showStep : styles.hideStep}>
                <MiniNavbarStepper currentStep={currentStep} />
            </div>
            <div className={`${styles.navbarcenter} ${location.pathname == "/cart" ? styles.hide : ""}`}>
                <ul className={clicked ? styles.navlinksActive : styles.navlinks}>
                    <li>
                        <Link to="/home" className={location.pathname === "/home" || location.pathname === "/" ? styles.pageLinkactive : styles.pageLink} onClick={() => { setClikced(false) }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/map" className={location.pathname === "/map" ? styles.pageLinkactive : styles.pageLink} onClick={() => { setClikced(false) }}>Map</Link>
                    </li>
                    <li>
                        <Link to="/webshop" className={location.pathname === "/webshop" || location.pathname.startsWith("/currentWine") ? styles.pageLinkactive : styles.pageLink} onClick={() => { setClikced(false) }}>Webshop</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.navbarright}>
                <Link to="/login" className={location.pathname === "/login" ? styles.usericonlogin : styles.usericon} onClick={() => { setClikced(false) }}>Login</Link>
                <Link to="/cart" className={location.pathname === "/cart" ? styles.carticonactive : styles.carticon} onClick={() => { setClikced(false) }}><i className="fa-solid fa-cart-shopping"></i></Link>
                <div className={styles.mobile}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"} onClick={() => setClikced(!clicked)}></i>
                </div>
            </div>
        </nav>
    )
}

export default Navbar