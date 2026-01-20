import React, { useEffect, useState } from 'react'
import styles from '../Mcss/Login.module.css'

const Login = () => {

  //Scrollbar hide
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  /*--------------*/

  //Input Fields Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const CheckSignUpInputs = () => {
    if(name && email && password && passwordAgain != "")
    {
      if(emailRegex.test(email))
      {
        if(password==passwordAgain && password.length >=8 && passwordAgain.length >=8)
        {
          ResetSignUpInputs()
          setActive(false)
        }
      }
    }
  }
  const CheckSignInInputs = () =>{
    if(signInEmail && signInPassword != "")
    {
      if(emailRegex.test(signInEmail) && signInPassword.length >=8)
      {
        ResetSignInInputs()
        setInputsActive(false);
      }
    }
  }
  /*--------------*/

  //Reset Input Fields
  const ResetSignInInputs = () =>{
    setShowPassword(false);
    setSignInEmail("");
    setSignInPassword("")
  }
  const ResetSignUpInputs = () => {
    setShowPassword(false); 
    setShowPasswordAgain(false); 
    setInputsActive(!inputsActive);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordAgain("")
  }
  /*--------------*/

  //UseStates
  const [active, setActive] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const [inputsActive, setInputsActive] = useState  (false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  /*--------------*/

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${active ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.formcontainer} ${styles.signupcontainer}`}>
          <form action="#">
            <h1>Create Account</h1>
             <div className={styles.inputGroup}>
              <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={inputsActive ? name : ""}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={inputsActive ? email : ""}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input type={showPassword ? "text" : "password"}  placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={inputsActive ? password : ""}/>
               <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                 <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input  type={showPasswordAgain ? "text" : "password"}  placeholder="Password" onChange={(e) => setPasswordAgain(e.target.value)} value={inputsActive ? passwordAgain : ""}/>
              <span className={styles.eyeIcon} onClick={() => setShowPasswordAgain(!showPasswordAgain)}>
                 <i className={showPasswordAgain ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <button onClick={() => CheckSignUpInputs()}>Sign Up</button>
          </form>
        </div>
        <div className={`${styles.formcontainer} ${styles.signincontainer}`}>
          <form action="#">
            <h1>Sign in</h1>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <input type="email" placeholder="Email" onChange={(e) => setSignInEmail(e.target.value)} value={inputsActive ? "" : signInEmail}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setSignInPassword(e.target.value)} value={inputsActive ? "" : signInPassword}/>
              <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <button onClick={() => CheckSignInInputs()}>Sign In</button>
          </form>
        </div>
        <div className={styles.overlaycontainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlaypanel} ${styles.overlayleft}`}>
              <p>If you already have an account, you can sign in here.</p>
              <button className={styles.ghost}  onClick={() => {ResetSignUpInputs(); setActive(false);}}>Sign In</button>
            </div>
            <div className={`${styles.overlaypanel} ${styles.overlayright}`}>
              <h2>Welcome to the Winelly!</h2>
              <p>If you don't have an account yet, you can sign up here.</p>
              <button className={styles.ghost}  onClick={() => {ResetSignInInputs(); setActive(true); setInputsActive(!inputsActive);}}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Login