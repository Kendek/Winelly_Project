import React, { useContext, useEffect, useState } from 'react'
import style from "../Mcss/Cart.module.css"
import { WineContext } from '../Mcontext/WineContextProvider'
import { Link } from 'react-router-dom'

const Cart = () => {

  const { cart, setCartItems } = useContext(WineContext)

  const [showCodeInput, setShowCodeInput] = useState(false);
  const shippingPrice = 2500;
  const itemsTotalPrice = cart.reduce((sum, i) => sum = sum + i.wine.price*i.quantity, 0)
  const fullPrice = itemsTotalPrice + shippingPrice

  const ControllQuantity = (wineId: number, action: "minus" | "plus") => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.wine.id !== wineId) return item;
        if (action === "plus") { 
          return { ...item, quantity: item.quantity + 1 }; 
        } 
        if (action === "minus") {
           return { ...item, quantity: item.quantity - 1 }; 
        } 
        return item;
      })
      .filter(item => item.quantity > 0)
    )
  }

  const DeleteCartItem = (wineId: number) => {
    setCartItems(prev => prev.filter(item => item.wine.id !== wineId))
  }

  return (
    < div className={style.mainDiv} >
      <div className={style.cartContainer}>

        <div className={style.cartItems}>
          <p>Shopping Cart</p>

          {cart.map((item, index) => (
            <div key={index} className={style.cartItem}>
              <div className={style.itemInfo}>
                <h4>{item.wine.name}</h4>
                <p>{item.wine.type}</p>
              </div>
              <div className={style.itemControls}>
                <span><button className={style.quantityBtn} onClick={() => ControllQuantity(item.wine.id, "minus")}>-</button> {item.quantity} <button className={style.quantityBtn} onClick={() => ControllQuantity(item.wine.id, "plus")}>+</button></span>
                <span>{(item.wine.price)*item.quantity} Ft</span>
                <button className={style.removeBtn} onClick={() => DeleteCartItem(item.wine.id)}>✕</button>
              </div>
            </div>
          ))}

          <Link to={"/webshop"}><p className={style.backLink}>← Back to shop</p></Link>
        </div>

        <div className={style.summary}>
          <p>Summary</p>

          <div className={style.summaryRow}>
            <span>{`ITEMS (${cart.reduce((sum, i) => sum = sum + i.quantity, 0)})`}</span>
            <span>{itemsTotalPrice} Ft</span>
          </div>

          <div className={style.summaryRow}>
            <span>SHIPPING</span>
            <span>{shippingPrice} Ft</span>
          </div>

          <div className={style.discountToggle} onClick={() => setShowCodeInput(!showCodeInput)}>
            + DISCOUNT CODE
          </div>

          {showCodeInput && (
            <input type="text" placeholder="Enter your code →" className={style.codeInput} />
          )}

          <div className={style.summaryTotal}>
            <strong>TOTAL PRICE</strong>
            <strong>{fullPrice} Ft</strong>
          </div>

          <button className={style.checkoutBtn}>CHECKOUT</button>
        </div>
      </div>
    </div >
  )
}

export default Cart