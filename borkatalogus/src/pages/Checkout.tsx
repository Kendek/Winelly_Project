import React, { use, useContext, useEffect, useState } from 'react'
import style from "../Mcss/Checkout.module.css";
import { formatPrice, WineContext } from '../Mcontext/WineContextProvider';
import { Link, useNavigate } from 'react-router-dom'

const Checkout = () => {
  const [entering, setEntering] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"personal" | "shipping" | "card">("personal");
  const { cart, setCartItems } = useContext(WineContext)
  const navigate = useNavigate();

  useEffect(() => {
    requestAnimationFrame(() => setEntering(true));
  }, []);

  const RemoveFromCart = (wineId: number) => {
    setCartItems(prev => prev.filter(item => item.wine.id !== wineId))
  }

  /* Prices calculate */
  const itemsTotalPrice = cart.reduce(
    (sum, i) => sum + i.wine.price * i.quantity,
    0
  );

  const shippingPrice = 2500;

  const savedCode = localStorage.getItem("discountCode");

  const discount = savedCode === "WINELLY25"
    ? Math.floor(itemsTotalPrice * 0.25)
    : 0;

  const finalPrice = itemsTotalPrice == 0 ? 0 : itemsTotalPrice + shippingPrice - discount;

  useEffect(() => {
    if (savedCode === "WINELLY25") {
      localStorage.setItem("discount", discount.toString());
    }
  }, [itemsTotalPrice]);
  /* ------------- */

  /* Personal Handling*/
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "");
  const [lastName, setLastName] = useState(localStorage.getItem("lastName") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState("");


  const onlyLetters = (v: string) =>
    v.replace(/[^a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, "");

  const onlyNumbers = (v: string) =>
    v.replace(/\D/g, "");


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(onlyNumbers(e.target.value).slice(0, 15));
  };

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(onlyLetters(e.target.value));
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(onlyLetters(e.target.value));
  };
  /* --------------- */

  /* Shipping Handling */
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(onlyLetters(e.target.value));
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(onlyLetters(e.target.value));
  };

  const handlePostal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostal(onlyNumbers(e.target.value).slice(0, 10));
  };

  const handleStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(onlyLetters(e.target.value));
  };

  const handleHouseNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(onlyNumbers(e.target.value));
  };
  /* --------------- */

  /* Card Handling */
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");


  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);

    value = value.replace(/(.{4})/g, "$1 ").trim();

    setCardNumber(value);
  };

  const handleCardOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z\s]/g, "");
    setCardOwner(value);
  };

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);

    if (value.length >= 2) {
      let month = Number(value.slice(0, 2));
      if (month === 0) month = 1;
      if (month > 12) month = 12;
      value = month.toString().padStart(2, "0") + value.slice(2);
    }

    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    }

    setExpiry(value);
  };

  const handleCvc = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 3);
    setCvc(value);
  };
  /* --------------- */

  /* Personal Validations */
  const handlePersonalContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!email.includes("@")) return;
    if (phone.length < 7) return;
    if (!firstName.trim()) return;
    if (!lastName.trim()) return;

    setActiveSection("shipping");
  };
  /* --------------- */

  /* Shipping Validations */
  const handleShippingContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!country.trim()) return;
    if (!city.trim()) return;
    if (!postal.trim()) return;
    if (!street.trim()) return;
    if (!houseNumber.trim()) return;

    setActiveSection("card");
  };
  /* --------------- */

  /* Card Validations */
  const handlePurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (cart.length == 0)
      return;

    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      return;
    }

    if (!cardOwner.trim()) {
      return;
    }

    if (!expiry || expiry.length !== 5) {
      return;
    }

    if (!cvc || cvc.length !== 3) {
      return;
    }
    setLeaving(true);
    setTimeout(() => {
      localStorage.setItem("finalPrice", formatPrice(finalPrice).toString());
      localStorage.setItem("email", email);
      navigate("/done");
    }, 400);

  };
  /* --------------- */

  return (
    <div className={`${style.mainDiv} ${entering ? style.slideInRight : style.hide} ${leaving ? style.slideOutLeft : ""}`}>
      <div className={style.containerCheckout}>
        <div className={style.leftSide}>

          <div className={style.section} onClick={() => setActiveSection("personal")}>
            <div
              className={style.sectionHeader}
            >
              <p>Personal Information</p>
            </div>

            <div className={`${style.sectionBody} ${activeSection === "personal" ? style.open : style.closed}`}>
              <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstName} />
              <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastName} />
              <input type="email" placeholder="Email" value={email} onChange={handleEmail} />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={handlePhone} />

              <button className={style.sectionButton} onClick={handlePersonalContinue}>
                Continue
              </button>

            </div>
          </div>

          <div className={style.section} onClick={() => setActiveSection("shipping")}>
            <div
              className={style.sectionHeader}
            >
              <p>Shipping Details</p>
            </div>

            <div className={`${style.sectionBody} ${activeSection === "shipping" ? style.open : style.closed}`}>
              <input type="text" placeholder="Country" value={country} onChange={handleCountry} />
              <input type="text" placeholder="City" value={city} onChange={handleCity} />
              <input type="text" placeholder="Postal Code" value={postal} onChange={handlePostal} />
              <input type="text" placeholder="Street" value={street} onChange={handleStreet} />
              <input type="text" placeholder="Number" value={houseNumber} onChange={handleHouseNumber} />

              <button className={style.sectionButton} onClick={handleShippingContinue}>
                Continue
              </button>

            </div>
          </div>

          <div className={style.section} onClick={() => setActiveSection("card")}>
            <div
              className={style.sectionHeader}
            >
              <p>Card Details</p>
            </div>

            <div className={`${style.sectionBody} ${activeSection === "card" ? style.open : style.closed}`}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleCardNumber}
              />
              <input
                type="text"
                placeholder="Card Owner"
                value={cardOwner}
                onChange={handleCardOwner}
              />
              <div className={style.row}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiry}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={handleCvc}
                />
              </div>
              <button className={style.purchaseButton} onClick={(e) => handlePurchase(e)}>Purchase</button>
            </div>
          </div>
          <Link to={"/cart"}><p className={style.backLink}>← Back to cart</p></Link>
        </div>


        <div className={style.rightSide}>
          <p>Order Summary</p>
          <div className={style.summaryList}>
            <div className={style.summaryHeaderRow}>
              <span>Img</span>
              <span>Name</span>
              <span>Amount</span>
              <span>Price</span>
              <span></span>
            </div>
            {cart.map((item, index) => (
              <div key={index} className={style.summaryItemRow}>
                <div className={style.summaryImg}><img src={item.wine.url ? item.wine.url : "wineTest.png"} alt="" /></div>
                <span>{item.wine.name}</span>
                <span>{item.quantity}</span>
                <span>{formatPrice(item.wine.price)}</span>
                <span className={style.trash} onClick={() => RemoveFromCart(item.wine.id)}><i className="fas fa-trash"></i></span>
              </div>
            ))}
          </div>

          <div className={style.summaryFooter}>
            <div className={style.summaryRow}>
              <span>Discount</span>
              <span>-{discount} Ft</span>
            </div>
            <div className={style.summaryRow}>
              <span>Shipping</span>
              <span>2500 Ft</span>
            </div>
            <div className={style.summaryRowTotal}>
              <span>Final price</span>
              <span>{formatPrice(finalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout