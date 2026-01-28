  import React, { useContext, useEffect, useState } from 'react'
  import style from '../Mcss/CurrentWine.module.css'
  import { WineContext, type Wine } from '../Mcontext/WineContextProvider';
  import { Rating } from '@mui/material';
  import { Link, useNavigate } from 'react-router-dom';

  const CurrentWine = () => {

    const { wines, currentWineId, setCartItems } = useContext(WineContext);
    const wine = wines.find(w => w.id === currentWineId);

    const handleAddToCart = (addWineToCart: Wine) => {
      setCartItems(prev => [...prev, addWineToCart])
    }

    const[closing, setClosing] =useState(false);

    if (!wine) {
      return undefined;
    }

    const navigate = useNavigate(); 
    
    const close = () => {
      setClosing(true)
      setTimeout(() => navigate("/webshop"), 300);
    }

    const avgRating = wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length;

    return (
      <div className={style.mainDiv}>
        <div className={`${style.container} ${closing ? style.closing : ""}`}>
          <button onClick={close} className={style.closeBtn}>X</button>
          <div className={style.overlay}>
            <div className={style.wineLeftSide}>
              <img src="wineTest.png" alt="" />
            </div>
            <div className={style.wineRightSide}>
              <div className={style.wineTitle}>
                <span>{wine?.name}</span>
              </div>
              <div className={style.wineRating}>
                <span>
                  <Rating value={avgRating} readOnly/>
                  <p>{wine.reviews.length}</p>
                  <i className="fa-solid fa-grip-lines-vertical"></i>
                  <b>View All Reviews</b>
                </span>
            </div>
            <div className={style.winePrice}>
              <span>{wine?.price} Ft</span>
            </div>
            <div className={style.wineDescription}>
              <p>
                {wine?.description}
              </p>
            </div>
            <div className={style.wineDetails}>
              <div>
                <i className="fa-solid fa-wine-glass"></i>
                <span>{wine?.type}</span>
              </div>
              <div>
                <i className="fa-solid fa-wine-bottle"></i>
                <span>{wine?.alcoholContent} %</span>
              </div>
              <div>
                <i className="fa-brands fa-pagelines"></i>
                <span>{wine?.grapes.map(grape => grape.name)}</span>
              </div>
              <div>
                <i className="fa-solid fa-calendar"></i>
                <span>{wine?.year}</span>
              </div>
            </div>
            <div className={style.wineBtn}>
              <button onClick={() => handleAddToCart(wine)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      </div >
    )
  }

  export default CurrentWine