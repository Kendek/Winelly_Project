import React from 'react'
import style from '../Mcss/Items.module.css'

const WebshopItem = () => {



    return (
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
                            <button className={style.itemBtn}><i className="fa-solid fa-cart-shopping"/></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default WebshopItem