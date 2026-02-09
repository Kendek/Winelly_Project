import React, { useContext, useEffect, useState } from 'react'
import style from "../Mcss/Cart.module.css"
import { WineContext } from '../Mcontext/WineContextProvider'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  
  const { cart, setCartItems } = useContext(WineContext)
  const navigate = useNavigate();

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const shippingPrice = 2500;
  const itemsTotalPrice = cart.reduce((sum, i) => sum = sum + i.wine.price * i.quantity, 0)
  const fullPrice = itemsTotalPrice == 0 ? 0 : itemsTotalPrice + shippingPrice - discount;

  const [leaving, setLeaving] = useState(false);

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


  const CheckDiscountCode = () => {
    if (codeValue.trim().toUpperCase() === "WINELLY25") {
      const discountAmount = Math.floor(itemsTotalPrice * 0.25);
      localStorage.setItem("discount", discountAmount.toString());
      localStorage.setItem("discountCode", "WINELLY25");
      setDiscount(discountAmount);
      setShowCodeInput(false)
      setCodeValue("");
    } else if (localStorage.getItem("discountCode") == "WINELLY25" && codeValue !== "WINELLY25"){
      setCodeValue("")
      return;
    }
    else
    {
      setDiscount(0);
      localStorage.removeItem("discount");
      localStorage.removeItem("discountCode");
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem("discountCode");

    if (savedCode === "WINELLY25") {
      const discountAmount = Math.floor(itemsTotalPrice * 0.25);
      setDiscount(discountAmount);
      localStorage.setItem("discount", discountAmount.toString());
    }
  }, [itemsTotalPrice]);


  return (
    <div className={`${style.mainDiv} ${leaving ? style.slideOutLeft : ""}`}>
      <div className={style.cartContainer}>
        <div className={style.cartItems}>
          <p>Shopping Cart</p>

          {cart.map((item, index) => (
            <div key={index} className={style.cartItem}>
              <div className={style.itemInfo}>
                <p>{item.wine.name}</p>
                <p>{item.wine.type}</p>
              </div>
              <div className={style.itemControls}>
                <span><button className={style.quantityBtn} onClick={() => ControllQuantity(item.wine.id, "minus")}>-</button> {item.quantity} <button className={style.quantityBtn} onClick={() => ControllQuantity(item.wine.id, "plus")}>+</button></span>
                <span>{(item.wine.price) * item.quantity} Ft</span>
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

          {discount > 0 && (
            <div className={style.summaryRow}>
              <span>DISCOUNT</span>
              <span>-{discount} Ft</span>
            </div>
          )}

          <div className={style.discountToggle} onClick={() => setShowCodeInput(!showCodeInput)}>
            + DISCOUNT CODE
          </div>

          {showCodeInput && (
            <input type="text" placeholder="Enter your code →" value={codeValue} onChange={(e) => setCodeValue(e.target.value)} className={style.codeInput} />
          )}
          {showCodeInput && (
            <button className={style.codeSubmit} onClick={() => CheckDiscountCode()}>Submit</button>
          )}

          <div className={style.summaryTotal}>
            <strong>TOTAL PRICE</strong>
            <strong>{fullPrice} Ft</strong>
          </div>

          <button className={style.checkoutBtn} onClick={() => {
            if (cart.length === 0) return;
            setLeaving(true);
            setTimeout(() => navigate("/checkout"), 400);
          }}>CHECKOUT</button>
        </div>
      </div>
    </div >
  )
}

export default Cart