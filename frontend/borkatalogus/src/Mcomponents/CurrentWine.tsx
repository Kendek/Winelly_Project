import React, { useContext, useEffect, useState } from 'react'
import style from '../Mcss/CurrentWine.module.css'
import { formatPrice, WineContext, type Wine } from '../Mcontext/WineContextProvider';
import { Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

type CurrentWineProps = {
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  setShowReview: (value: boolean) => void;
};


const CurrentWine = ({ cartIconRef, setShowReview }: CurrentWineProps) => {

  /* Add to cart Animation*/
  const startFlyAnimation = (imgElement: HTMLImageElement) => {
    const cartIcon = cartIconRef.current;
    if (!cartIcon) return;

    const imgRect = imgElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = imgElement.cloneNode(true) as HTMLImageElement;
    flyingImg.classList.add(style.flyingImage);

    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.transform = "scale(0.2)";
      flyingImg.style.opacity = "0";
    });

    flyingImg.addEventListener("transitionend", () => {
      flyingImg.remove();
    });
  };
  /*-------------------*/

  const { wines, currentWineId, setCartItems, setCurrentWineId } = useContext(WineContext);
  const wine = wines.find(w => w.id === currentWineId);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  
  return () => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  };
}, []);


  const handleAddToCart = (addWineToCart: Wine) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.wine.id === addWineToCart.id);
      if (existing) {
        return prev.map(item =>
          item.wine.id === addWineToCart.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { wine: addWineToCart, quantity: 1 }];
    });
  };


  const [closing, setClosing] = useState(false);

  if (!wine) {
    return undefined;
  }

  const navigate = useNavigate();

  const close = () => {
    setClosing(true)
    setTimeout(() => navigate("/webshop"), 300);
  }

  const handleClick = (wine: Wine) => {
    setCurrentWineId(wine.id);
  }

  const avgRating = Array.isArray(wine.ratings) && wine.ratings.length > 0
    ? wine.ratings.reduce((sum, r) => sum + r.score, 0) / wine.ratings.length
    : 0;


  return (
    <div className={style.mainDiv} onClick={(e) => { if (e.target === e.currentTarget) { close() } }}>
      <div className={`${style.container} ${closing ? style.closing : ""}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className={style.closeBtn}>X</button>
        <div className={style.overlay}>
          <div className={style.wineLeftSide}>
            <img src={wine.url ? wine.url : "wineTest.png"} alt="" className={style.currentWineImage} />
          </div>
          <div className={style.wineRightSide}>
            <div className={style.wineTitle}>
              <span>{wine.name}</span>
            </div>
            <div className={style.wineRating}>
              <span>
                <Rating value={avgRating} precision={0.5} readOnly />
                <p>({wine.ratings.length})</p>
                <i className="fa-solid fa-grip-lines-vertical"></i>
                <b onClick={() => { handleClick(wine); setShowReview(true) }}>View All ratings</b>
              </span>
            </div>
            <div className={style.winePrice}>
              <span>{formatPrice(wine.price)}</span>
            </div>
            <div className={style.wineDescription}>
              <p>
                {wine.description}
              </p>
            </div>
            <div className={style.detailsToggle} onClick={() => setDetailsOpen(!detailsOpen)}>
              Wine Details
              <i className={`fa-solid fa-chevron-${detailsOpen ? "up" : "down"}`}></i>
            </div>
              <div className={`${style.wineDetails} ${detailsOpen ? style.open : ""}`}>
                <div>
                  <i className="fa-solid fa-wine-glass"></i>
                  <span>{wine.type}</span>
                </div>
                <div>
                  <i className="fa-solid fa-wine-bottle"></i>
                  <span>{wine.alcoholContent} %</span>
                </div>
                <div>
                  <i className="fa-brands fa-pagelines"></i>
                  <span>{wine.grapes.map(g => g.name).join(", ")}</span>
                </div>
                <div>
                  <i className="fa-solid fa-calendar"></i>
                  <span>{wine.year}</span>
                </div>
              </div>
            <div className={style.wineBtn}>
              <button
                onClick={() => {
                  handleAddToCart(wine);

                  const img = document.querySelector(`.${style.currentWineImage}`) as HTMLImageElement;
                  if (img) startFlyAnimation(img);
                }}>Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CurrentWine