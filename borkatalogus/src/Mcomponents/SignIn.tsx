import React, { useState } from 'react'
import style from "../Mcss/SuLiForms.module.css"

type Props = {
  flipForm: () => void
}

const SignIn = ({ flipForm }: Props) => {

  const [visible, setVisible] = useState(false)
  const[loginEmail, setLoginEmail] = useState("")
  const[loginPassword, setLoginPassword] = useState("")

  const ResetFields = () => {
    setVisible(false)
    setLoginEmail("")
    setLoginPassword("")
  }

  const SubmitLogin = () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;

    if(loginEmail && loginPassword != "")
    {
      if(emailRegex.test(loginEmail))
      {
        ResetFields()
        console.log("good")
      }
    }
  }
  
  return (
    <div className={`${style.formSide} ${style.loginForm}`}>
      <div className={style.formHeader}>
        <p className={style.formTitle}>Welcome to Winelly</p>
      </div>

    <div className={style.formLabelsInputs}>
      <div className={style.formGroup}>
        <label className={style.formLabel}>Email Address</label>
        <input type="email" className={style.formInput} placeholder="john@example.com" onChange={(event)=> setLoginEmail(event?.target.value)} value={loginEmail} required/>
      </div>

      <div className={`${style.formGroup} ${style.passwordGroup}`}>
        <label className={style.formLabel}>Password</label>
        <input type={visible ? "text" : "password"} className={style.formInput} placeholder="Enter your password" onChange={(event)=> setLoginPassword(event?.target.value)} value={loginPassword} required/>
        <button type="button" className={style.passwordToggle} onClick={() => setVisible(prev => !prev)}>
          <i className={visible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} />
        </button>
      </div>
    </div>

      <div className={style.formActions}>
        <button type="submit" className={style.submitBtn} onClick={() => {SubmitLogin()}}>Sign In</button>

        <div className={style.formSwitch}>
          <p className={style.switchText}>
            Don't have an account?
            <span className={style.switchLink} onClick={() => {flipForm(); ResetFields()}}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
