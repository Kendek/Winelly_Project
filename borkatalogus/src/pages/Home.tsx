import styles from "../Kcss/Home.module.css"
import HomeSecondPart from "../Ksrc/HomeSecondPart"
import { Rating } from '@mui/material';
import 'aos/dist/aos.css';
import { FaAngleDoubleDown } from "react-icons/fa";
import AOS from 'aos';
import HomeThirdPart from "../Ksrc/HomeThirdPart";
import { useNavigate } from 'react-router-dom';

export const ScrollForward = () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}
const Home = () => {
AOS.init({
  duration: 1000,
});

    const navigate = useNavigate();

  return (
    <div className={styles.HomeMain}>
      <div className={styles.HomeFirst}>
  <div data-aos="fade-down" data-aos-duration="1500" className={styles.TextContainer}>

    <div className={styles.HeroTag}>
      <i className="fa-solid fa-wine-glass"></i> Premium Wine Collection
    </div>

    <h1 className={styles.HeroHeading}>
      Quality & Quantity at one place
    </h1>

    <div className={styles.StarsRow}>
      <Rating className={styles.Stars} value={5} precision={0.5} readOnly />
      <span>Trusted by thousands daily</span>
    </div>

    <div className={styles.HeroDivider} />

    <p className={styles.HeroBody}>
      A wide variety of wine from all around the world —
      handpicked, curated, and delivered to your door.
    </p>

    <p className={styles.HeroBody}>
      <i className="fa-solid fa-globe"></i> Worldwide shipping, every day of the year, at an affordable price.
    </p>

    <div className={styles.HeroDivider} />

    <button className={styles.HeroOrderBtn} onClick={() => navigate('/webshop')}>
      Order Now <i className="fa-solid fa-cart-shopping"></i>
    </button>

  </div>
</div>
     <div className={styles.ScrollDown} onClick={ScrollForward}>
        <FaAngleDoubleDown className={styles.ScrollIcon}/>
     </div>
      <div className={styles.GradientBackground }>
            <HomeSecondPart/>
            <HomeThirdPart/>
      </div>


    </div>
  )
}

export default Home