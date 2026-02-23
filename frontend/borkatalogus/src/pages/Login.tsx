import React, { useEffect, useState } from 'react'
import style from '../Mcss/Login.module.css'
import SignUp from '../Mcomponents/SignUp'
import SignIn from '../Mcomponents/SignIn'

const Login = () => {

  const [flipped, setFlipped] = useState(false)

  const flipForm = () => {
    setFlipped(prev => !prev)
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
    <div className={style.authContainer}>
      <div className={style.formWrapper}>
        <div className={`${style.formContainer} ${flipped ? style.flipped : ""}`}>
          <SignIn flipForm={flipForm} />
          <SignUp flipForm={flipForm} />
        </div>
      </div>
    </div>

  )
}

export default Login