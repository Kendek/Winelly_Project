import styles from "../Home.module.css"
import FavCard from "./FavCard"
const HomeSecondPart = () => {
  return (
        <div className={styles.HomeSecond}>
          
          <div className={styles.FlexBox}>
            <div className={styles.LineDecor}></div>
            <span className={styles.Title}>Our best rated Wines!</span>
            <div className={styles.LineDecor}></div>
          </div>
      

        <div className={styles.FavCardContainer}>

          <FavCard classname="FavCardUp"></FavCard>
          <FavCard classname="FavCardDown"></FavCard>
          <FavCard classname="FavCardUp"></FavCard>

        </div>

            

        
      </div>
  )
}

export default HomeSecondPart