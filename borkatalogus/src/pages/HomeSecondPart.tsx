import styles from "../Home.module.css"

const HomeSecondPart = () => {
  return (
        <div className={styles.HomeSecond}>
        <h1 className={styles.Title}>------ Our best rated Wines! ------</h1>

        <div className={styles.FavCardContainer}>

            <div className={styles.FavCardUp} >
              <div className={styles.ImgBg}>
                    <img src="WineBottle.png" alt="" />
              </div>
                <div className={styles.CardDesc}>
                  <h1 className={styles.CardTitle}>Badenhorst Secateurs</h1>
                  <span className={styles.CardRating}>4.7 / 5 ⭐</span> <span className={styles.CardPrice}>189.99 $</span>
                </div>
            </div>

            
        </div>

        
      </div>
  )
}

export default HomeSecondPart