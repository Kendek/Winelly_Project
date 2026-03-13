import styles from "../Kcss/Home.module.css"
import '../Kcss/FavCard.css'
import { Rating } from '@mui/material';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";


const FavCard = (props: { CardImg:string, classname: string, name: string, price: number, rating: number, WineId: number, duration: string }) => {


  const navigate = useNavigate();
  const SelectCardWine = () => {
    navigate('/webshop', { state: { wineId: props.WineId } });
  }

  return (
    <div data-aos="fade-down" data-aos-duration={props.duration}   className={`${props.classname} ${styles.AnimatedCard}`} >
      <div  className={styles.ImgBg}>
        <div className={styles.CircleRing} />
        <img className={styles.CardIMG} src={props.CardImg} alt="" />
      </div>
      <div className={styles.CardDesc}>
        <span data-aos="fade-right" data-aos-duration={props.duration}   className={styles.CardTitle}>{props.name}</span>
        <br />
        <span data-aos="fade-left" data-aos-duration={props.duration} className={styles.CardPrice}>{props.price} Ft</span>

        <span data-aos="fade-up" data-aos-duration={props.duration} className={styles.CardRating}>
          <Rating
            value={props.rating}
            readOnly
            precision={0.5}
            sx={{
              "& .MuiRating-iconFilled": { color: "#8B1E3F" },
              "& .MuiRating-iconEmpty": { color: "#8B1E3F" },
              fontSize: "1.4rem",
            }}
          />
          <span style={{color: "#8B1E3F", padding: "0 0 10px 10px"}}>           {props.rating.toFixed(1) }</span>

          </span>
        <button type="button" onClick={() => SelectCardWine()} className={styles.OrderButton}>Order!</button>
      </div>
    </div>
  )
}

export default FavCard