import styles from "../Kcss/Home.module.css"
import '../Kcss/FavCard.css'
import { Rating } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FavCard = (props: { classname: string, image:File, name:string, price:number, rating:number   }) => {
     AOS.init({
      duration:1000
    });
  return (
            <div data-aos="fade-down" className={props.classname} >
              <div className={styles.ImgBg}>
                    <img src="WineBottle.png" alt="" />
              </div>
                <div className={styles.CardDesc}>
                  <span className={styles.CardTitle}>{props.name}</span> 
                  <span className={styles.CardPrice}>{props.price}</span>
                  
                  <span className={styles.CardRating}><Rating value={props.rating} readOnly precision={0.5}></Rating></span>
                  <button type="button" className={styles.OrderButton}>Order!</button>
                </div>
            </div>
  )
}

export default FavCard