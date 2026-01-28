import React, { useContext, useState } from 'react'
import style from '../Mcss/WebshopItem.module.css'
import { Link } from 'react-router-dom'
import { WineContext, type Wine } from '../Mcontext/WineContextProvider';
import { pre } from 'motion/react-client';

const WebshopItem = ({filteredWines} : {filteredWines : Wine[]}) => {

    const { setCurrentWineId, setCartItems} = useContext(WineContext);

    const handleAddToCart = (e: React.MouseEvent, wineToCart: Wine) => {
        e.stopPropagation();

        setCartItems(prev => {
            const existing = prev.find(item=> item.wine.id === wineToCart.id);

            if(existing)
            {
                return prev.map(item=>item.wine.id == wineToCart.id ? {...item, quantity: item.quantity + 1} : item);
            }
            return [...prev, {wine: wineToCart, quantity: 1}]
        });
    };

    const handleClick = (wine: Wine) => 
    { 
        setCurrentWineId(wine.id);
    }
        

    return (
        filteredWines.map((wine, index) => (
                <div className={style.singleItem} style={{ "--i": index } as any} onClick={() => handleClick(wine)}>
                    <div className={style.imageWrapper}>
                        <img src="wineTest.png" alt="" />
                        <div className={style.overlay}>
                            <div className={style.itemTexts}>
                                <div>
                                    <div className={style.itemTitle}>
                                        <span>{wine.name}</span>
                                    </div>
                                    <div className={style.itemPrice}>
                                        <p>{wine.price} Ft</p>
                                    </div>
                                </div>
                                <div>
                                    <button className={style.itemBtn} onClick={(e) => handleAddToCart(e, wine)}><i className="fa-solid fa-cart-shopping" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        ))
    )
}

export default WebshopItem