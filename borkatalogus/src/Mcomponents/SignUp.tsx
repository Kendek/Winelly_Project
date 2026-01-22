import React, { useState } from 'react'
import styles from "../Mcss/SuLiForms.module.css"


type Props = {
  flipForm: () => void
}


const SignUp = ({ flipForm }: Props) => {

  const [visible, setVisible] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  const ResetFields = () => {
    setVisible(false)
    setFirstName("")
    setLastName("")
    setSignupEmail("")
    setSignupPassword("")
  }

  const SubmitSignup = () => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    if (firstName && lastName && signupEmail && signupPassword != "") {
      if (emailRegex.test(signupEmail))
      {
        if(passwordRegex.test(signupPassword))
        {
          ResetFields()
          flipForm()
          console.log("good")
        }
      }
    }
  }

  return (
    <div className={`${styles.formSide} ${styles.signupForm}`}>
      <div className={styles.formHeader}>
        <p className={styles.formTitle}>Create Account</p>
      </div>

      <div className={styles.formLabelsInputs}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>First Name</label>
            <input type="text" className={styles.formInput} placeholder="John" onChange={(event) => {setFirstName(event.target.value)}} value={firstName} required/>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Last Name</label>
            <input type="text" className={styles.formInput} placeholder="Doe" onChange={(event) => {setLastName(event.target.value)}} value={lastName} required/>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email Address</label>
          <input type="email" className={styles.formInput} placeholder="john@example.com" onChange={(event) => {setSignupEmail(event.target.value)}} value={signupEmail} required/>
        </div>

        <div className={`${styles.formGroup} ${styles.passwordGroup}`}>
          <label className={styles.formLabel}>Password</label>
          <input type={visible ? "text" : "password"} className={styles.formInput} placeholder="Enter your password" onChange={(event) => {setSignupPassword(event.target.value)}} value={signupPassword} required/>
          <button type="button" className={styles.passwordToggle} onClick={() => setVisible(prev => !prev)}>
            <i className={visible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} />
          </button>
        </div>
      </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} onClick={() => { SubmitSignup() }}>
            Create Account
          </button>

          <div className={styles.formSwitch}>
            <p className={styles.switchText}>
              Already have an account?
              <span className={styles.switchLink} onClick={() => {flipForm(); ResetFields() }}>
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>

  )
}

export default SignUp