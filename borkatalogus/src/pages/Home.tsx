import styles from "../Kcss/Home.module.css"
import HomeSecondPart from "../Ksrc/HomeSecondPart"
import { Rating } from '@mui/material';
import 'aos/dist/aos.css';
import { FaAngleDoubleDown } from "react-icons/fa";
import AOS from 'aos';

export const ScrollForward = () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}
const Home = () => {
AOS.init({
  duration: 1000,
});

  return (
    <div className={styles.HomeMain}>

      <div className={styles.HomeFirst}>  
        <div data-aos="fade-down" data-aos-duration="1500"  className={styles.TextContainer}>
          <h1>Quality & Quantity at one place!</h1>
          <h3>A a wide variety of wine from all around the world!</h3>
          <h3>Trusted and used by thousands of users everyday.</h3>
          <h1 className={styles.Stars}><Rating className={styles.Stars} value={5} precision={0.5} readOnly></Rating></h1>
          <h3>Worldwide shipping in everyday of the year for affordable price.</h3>
          <div className={`${styles.LineDecor} ${styles.White}` }></div>
          <h2>Order Now 🛒</h2>

        </div>  
      </div>
     <div className={styles.ScrollDown} onClick={ScrollForward}>
        <FaAngleDoubleDown className={styles.ScrollIcon}/>
     </div>
      {/* <div className={styles.HomeDivider}> </div> */}
      <HomeSecondPart>
        
      </HomeSecondPart>

    </div>
  )
}

export default Home