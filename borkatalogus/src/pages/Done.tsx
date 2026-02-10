import React, { useContext, useEffect, useState } from 'react'
import style from "../Mcss/Done.module.css"
import { formatPrice, WineContext } from '../Mcontext/WineContextProvider';
import { useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";

const Done = () => {
  const [entering, setEntering] = useState(false);
  const navigate = useNavigate();
  const { cart, setCartItems } = useContext(WineContext)

  useEffect(() => {
    requestAnimationFrame(() => setEntering(true));

    const email = localStorage.getItem("email") || "test@example.com";

    const orderHTML = cart.map(item => `
  <div style="margin-bottom: 15px;">
    <img src="${item.wine.url}" width="120" style="border-radius: 8px;" />
    <p><strong>${item.wine.name}</strong></p>
    <p>Amount: ${item.quantity}</p>
    <p>Price: ${formatPrice(item.wine.price * item.quantity)}</p>
  </div>
`).join("");


    const shipping = 2500;
    const discount = localStorage.getItem("discount");
    const finalPrice = localStorage.getItem("finalPrice")

    emailjs.send(
      "service_gw8s2ev",
      "template_kg8wxrd",
      {
        email,
        order_id: Math.floor(Math.random() * 1000000),
        logo_url: "https://ik.imagekit.io/svighwdffc/Winelly/logo.png",
        orders: orderHTML,
        cost: {
          shipping,
          discount,
          total: finalPrice
        }
      },
      "06N54_B8CMh2bFLOV"
    ).then(() => {
      console.log("Email sent!");
    }).catch((err) => {
      console.error("Email error:", err);
    });
  }, []);


  useEffect(() => {
    return () => {
      localStorage.removeItem("discount");
      localStorage.removeItem("discountCode");
      localStorage.removeItem("cart");
      localStorage.removeItem("email");
      localStorage.removeItem("finalPrice");
      setCartItems([]);
    };
  }, []);


  return (
    <div className={`${style.mainDiv} ${entering ? style.slideInRight : style.hide}`}>
      <div className={style.containerDone}>

        <span>Thank you for your purchase!</span>
        <p>We will send the receipt and the tracking number in email!</p>

        <div className={style.orderBox}>
          {cart.map((item, index) => (
            <div key={index} className={style.orderItem}>
              <div className={style.itemImg}>
                <img src={item.wine.url ? item.wine.url : "wineTest.png"} alt={item.wine.name} />
              </div>
              <span className={style.itemName}>{item.wine.name}</span>
              <span className={style.itemQty}>Amount: {item.quantity}</span>
            </div>
          ))}
        </div>

        <button
          className={style.backButton}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>


      </div>
    </div >
  )
}

export default Done