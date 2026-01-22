import styles from "../Home.module.css"
import '../Kcss/FavCard.css'
import {Rating} from "primereact/rating"

const FavCard = (props: { classname: string }) => {
  return (
            <div className={props.classname} >
              <div className={styles.ImgBg}>
                    <img src="WineBottle.png" alt="" />
              </div>
                <div className={styles.CardDesc}>
                  <span className={styles.CardTitle}>Badenhorst Secateurs</span> 
                  <span className={styles.CardPrice}>189.99$</span>
                  <span className={styles.Discount}>200 $</span>
                  
                  <span className={styles.CardRating}><Rating value={4} readOnly cancel={false}></Rating></span>
                  <button type="button" className={styles.OrderButton}>Order!</button>
                </div>
            </div>
  )
}

export default FavCard