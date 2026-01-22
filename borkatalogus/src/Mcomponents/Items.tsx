import React from 'react'
import style from '../Mcss/Items.module.css'
import CurrentWine from './CurrentWine'
import { Link } from 'react-router-dom'

const WebshopItem = () => {

    const handleAddToCart = (e: React.MouseEvent) => 
    { 
        e.stopPropagation(); 
        e.preventDefault(); 
    };

    return (
        <Link to="/currentWine">
            <div className={style.singleItem}>
                <div className={style.imageWrapper}>
                    <img src="wineTest.png" alt="" />
                    <div className={style.overlay}>
                        <div className={style.itemTexts}>
                            <div>
                                <div className={style.itemTitle}>
                                    <span>Chardonnay</span>
                                </div>
                                <div className={style.itemPrice}>
                                    <p>4 500 Ft</p>
                                </div>
                            </div>
                            <div>
                                <button className={style.itemBtn} onClick={handleAddToCart}><i className="fa-solid fa-cart-shopping" /></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Link>

    )
}

export default WebshopItem