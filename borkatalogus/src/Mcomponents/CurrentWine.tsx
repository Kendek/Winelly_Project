import React from 'react'
import style from '../Mcss/CurrentWine.module.css'
import { Rating } from 'primereact/rating';

const CurrentWine = () => {
  return (
    <div className={style.mainDiv}>
      <div className={style.container}>
        <div className={style.wineLeftSide}>
          <img src="wineTest.png" alt="" />
        </div>
        <div className={style.wineRightSide}>
          <div className={style.wineTitle}>
            <span>Item Name</span>
          </div>
          <div className={style.wineRating}>
            <span>
              <Rating value={5} readOnly cancel={false} />
              <p>35</p><i className="fa-solid fa-grip-lines-vertical">
              </i><a href="">View All Reviews</a>
            </span>
          </div>
          <div className={style.winePrice}>
            <span>4000 Ft</span>
          </div>
          <div className={style.wineDescription}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Mollitia quisquam at necessitatibus, exercitationem enim iste eum sequi modi,
              accusamus minus dolorum delectus dolor laudantium vitae debitis quia eius dolores blanditiis.
            </p>
          </div>
          <div className={style.wineDetails}>
            <div>
              <i className="fa-solid fa-wine-glass"></i>
              <span>Red</span>
            </div>
            <div>
              <i className="fa-solid fa-wine-bottle"></i>
              <span>14.5%</span>
            </div>
            <div>
              <i className="fa-brands fa-pagelines"></i>
              <span>Piot Noir</span>
            </div>
            <div>
              <i className="fa-solid fa-calendar"></i>
              <span>1998</span>
            </div>
          </div>
          <div className={style.wineBtn}>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWine