import styles from "../Home.module.css"

const Home = () => {
  return (
    <div className={styles.HomeMain}>
      <div className={styles.TextContainer}>
        <h1>Quality and Quantity at one place!</h1>
        <h3>A a wide variety of </h3>
        <h2>Order Now</h2>
      </div>
      <img className={styles.WineBottle} src="./WineBottle.png" alt="" />
      <img className={styles.WineBottle} src="./WineBottle.png" alt="" />
    </div>
  )
}

export default Home