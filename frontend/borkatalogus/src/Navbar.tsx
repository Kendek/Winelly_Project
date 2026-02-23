import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from "./Navbar.module.css"
import { WineContext } from './Mcontext/WineContextProvider';
import MiniNavbarStepper from './Stepper/MiniNavbarStepper';
import { LogoutUser } from './MServices/AccountService';
import { jwtDecode } from "jwt-decode";

type NavbarProps = {
    cartIconRef: React.RefObject<HTMLDivElement | null>
};

const Navbar = ({ cartIconRef }: NavbarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const { setCurrentWineId } = useContext(WineContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(null);

    const getCurrentStep = () => {
        if (location.pathname === "/cart") return 1;
        if (location.pathname === "/checkout") return 2;
        if (location.pathname === "/done") return 3;
        return 0;
    };

    const currentStep = getCurrentStep();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setRole(decoded.role);
                localStorage.setItem("role", decoded.role);
            } catch {
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const sync = () => setIsLoggedIn(!!localStorage.getItem("token"));
        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location.pathname]);

    useEffect(() => {
        setCurrentWineId(null);
    }, [location]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);


    return (
        <>
            {menuOpen && (
                <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)}></div>
            )}
            <nav className={styles.navbar}>
                <div className={styles.navbarleft}>
                    <Link to="/home"><img src="./logo.png" alt="" className={`${location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/done" ? styles.hideLogo : ""} ${styles.logo}`} /></Link>
                </div>
                <div className={currentStep ? styles.showStep : styles.hideStep}>
                    <MiniNavbarStepper currentStep={currentStep} />
                </div>
                <div className={`${styles.navbarcenter} ${location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/done" ? styles.hide : ""}`}>
                    <ul className={menuOpen ? styles.navlinksActive : styles.navlinks}>
                        <li>
                            <Link to="/home" className={location.pathname === "/home" || location.pathname === "/" ? styles.pageLinkactive : styles.pageLink} onClick={() => setMenuOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/map" className={location.pathname === "/map" ? styles.pageLinkactive : styles.pageLink} onClick={() => setMenuOpen(false)}>Map</Link>
                        </li>
                        <li>
                            <Link to="/webshop" className={location.pathname === "/webshop" || location.pathname.startsWith("/currentWine") || location.pathname === "/review" ? styles.pageLinkactive : styles.pageLink} onClick={() => setMenuOpen(false)}>Webshop</Link>
                        </li>
                    </ul>
                </div>
                <div className={`${styles.navbarright} ${location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/done" ? styles.navbarrightHidden : ""}`}>
                    <Link
                        to="/login"
                        className={location.pathname === "/login" ? styles.usericonlogin : styles.usericon}
                        onClick={() => setMenuOpen(false)}
                        style={{ display: isLoggedIn || role === "Admin" ? "none" : "block" }}
                    >Login</Link>
                    {role === "Admin" && (<Link to="/adminaccounts" className={location.pathname === "/adminaccounts" ? styles.pageLinkactive : styles.pageLink} onClick={() => setMenuOpen(false)}>Admin</Link>)}
                    {isLoggedIn && role !== "Admin" && (<p><b>Dear</b> {localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "Guest"}!</p>)}
                    {isLoggedIn && (<button className={styles.userLogout} onClick={async () => { await LogoutUser(); setIsLoggedIn(false); navigate("/home"); }}><i className="fa-solid fa-right-from-bracket"></i></button>)}
                    <div ref={cartIconRef} className={styles.cartIconWrapper}>
                        <Link to="/cart" className={location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/done" ? styles.carticonactive : styles.carticon} onClick={() => setMenuOpen(false)}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </div>
                    <div className={styles.mobile}>
                        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} onClick={() => setMenuOpen(prev => !prev)}></i>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;