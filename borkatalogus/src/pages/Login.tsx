import React, { useEffect, useState } from 'react'
import styles from '../Mcss/Login.module.css'

const Login = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const [clearFields, setClearFields] = useState  (false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${active ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.formcontainer} ${styles.signupcontainer}`}>
          <form action="#">
            <h1>Create Account</h1>
             <div className={styles.inputGroup}>
              <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
              <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={clearFields ? name : ""}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={clearFields ? email : ""}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={clearFields ? password : ""}/>
               <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                 <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input  type={showPasswordAgain ? "text" : "password"} placeholder="Password Again" onChange={(e) => setPasswordAgain(e.target.value)} value={clearFields ? passwordAgain : ""}/>
              <span className={styles.eyeIcon} onClick={() => setShowPasswordAgain(!showPasswordAgain)}>
                 <i className={showPasswordAgain ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <button>Sign Up</button>
          </form>
        </div>
        <div className={`${styles.formcontainer} ${styles.signincontainer}`}>
          <form action="#">
            <h1>Sign in</h1>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
              <input type="email" placeholder="Email" onChange={(e) => setSignInEmail(e.target.value)} value={clearFields ? "" : signInEmail}/>
            </div>
            <div className={styles.inputGroup}>
              <i className={`fa-solid fa-lock ${styles.inputIcon}`}></i>
              <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setSignInPassword(e.target.value)} value={clearFields ? "" : signInPassword}/>
              <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
              </span>
            </div>
            <button>Sign In</button>
          </form>
        </div>
        <div className={styles.overlaycontainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlaypanel} ${styles.overlayleft}`}>
              <p>If you already have an account, you can log in here.</p>
              <button className={styles.ghost}  onClick={() => {
                  setActive(false);
                  setShowPassword(false); 
                  setShowPasswordAgain(false); 
                  setClearFields(!clearFields);
                  setName("");
                  setEmail("");
                  setPassword("");
                  setPasswordAgain("")
                  }}>Sign In</button>
            </div>
            <div className={`${styles.overlaypanel} ${styles.overlayright}`}>
              <h2>Welcome to the Winelly!</h2>
              <p>If you don't have an account yet, you can sign up here.</p>
              <button className={styles.ghost}  onClick={() => {
                setActive(true);
                setShowPassword(false);
                setShowPasswordAgain(false);
                setClearFields(!clearFields);
                setSignInEmail("");
                setSignInPassword("")
                }}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Login