import React, { useContext, useEffect, useState } from 'react'
import style from "../Mcss/Done.module.css"
import { WineContext } from '../Mcontext/WineContextProvider';
import { useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";

const Done = () => {
  const [entering, setEntering] = useState(false);
  const navigate = useNavigate();
  const { cart, setCartItems } = useContext(WineContext)

  useEffect(() => {
    requestAnimationFrame(() => setEntering(true));

    const email = localStorage.getItem("email") || "test@example.com";

    const orderItems = cart.map(item => ({
      name: item.wine.name,
      units: item.quantity,
      price: item.wine.price * item.quantity,
      image: "item.wine.image"
    }));

    const shipping = 2500;
    const discount = localStorage.getItem("discount");
    const finalPrice = localStorage.getItem("finalPrice")

    emailjs.send(
      "service_gw8s2ev",
      "template_kg8wxrd",
      {
        email,
        order_id: Math.floor(Math.random() * 1000000),
        logo_url: "logo.png",
        orders: orderItems,
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
                <img src="wineTest.png" alt={item.wine.name} />
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