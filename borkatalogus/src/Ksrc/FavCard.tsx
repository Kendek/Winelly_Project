import styles from "../Kcss/Home.module.css"
import '../Kcss/FavCard.css'
import { Rating } from '@mui/material';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";


const FavCard = (props: { CardImg: string, classname: string, name: string, price: number, rating: number, WineId: number }) => {
  const navigate = useNavigate();
  const SelectCardWine = () => {
    navigate('/webshop', { state: { wineId: props.WineId } });
  }

  return (
    <div className={props.classname} >
      <div className={styles.ImgBg}>
        <img className={styles.CardIMG} src={props.CardImg} alt="" />
      </div>
      <div className={styles.CardDesc}>
        <span className={styles.CardTitle}>{props.name}</span>
        <br />
        <span className={styles.CardPrice}>{props.price} Ft</span>

        <span className={styles.CardRating}><Rating value={props.rating} readOnly precision={0.5}></Rating></span>
        <button type="button" onClick={() => SelectCardWine()} className={styles.OrderButton}>Order!</button>
      </div>
    </div>
  )
}

export default FavCard