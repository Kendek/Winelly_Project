import styles from "../Kcss/Home.module.css"
import '../Kcss/FavCard.css'
import { Rating } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FavCard = (props: { classname: string }) => {
     AOS.init({
      duration:1000
    });
  return (
            <div data-aos="fade-down" className={props.classname} >
              <div className={styles.ImgBg}>
                    <img src="WineBottle.png" alt="" />
              </div>
                <div className={styles.CardDesc}>
                  <span className={styles.CardTitle}>Badenhorst Secateurs</span> 
                  <span className={styles.CardPrice}>189.99$</span>
                  <span className={styles.Discount}>200 $</span>
                  
                  <span className={styles.CardRating}><Rating value={4} readOnly precision={0.5}></Rating></span>
                  <button type="button" className={styles.OrderButton}>Order!</button>
                </div>
            </div>
  )
}

export default FavCard