import React, { useState } from 'react'
import styles from '../Mcss/Login.module.css'

const Login = () => {
  const [active, setActive] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${active ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.formcontainer} ${styles.signupcontainer}`}>
          <form action="#">
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className={`${styles.formcontainer} ${styles.signincontainer}`}>
          <form action="#">
            <h1>Sign in</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
          </form>
        </div>
        <div className={styles.overlaycontainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlaypanel} ${styles.overlayleft}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className={styles.ghost}  onClick={() => setActive(false)}>Sign In</button>
            </div>
            <div className={`${styles.overlaypanel} ${styles.overlayright}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={styles.ghost}  onClick={() => setActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Login