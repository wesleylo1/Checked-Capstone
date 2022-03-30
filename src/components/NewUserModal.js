import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/NewUserModal.css"

function NewUserModal({ trigger, setTrigger }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState({})
  const [passwordError, setPasswordError] = useState({})
  const navigate = useNavigate()

  let newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  function handleFirstChange(e) {
    setFirstName(e.target.value)
    let key = e.target.name
    newUser[key] = e.target.value
  }

  function handleLastChange(e) {
    setLastName(e.target.value)
    let key = e.target.name
    newUser[key] = e.target.value
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
    let key = e.target.name
    newUser[key] = e.target.value
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
    let key = e.target.name
    newUser[key] = e.target.value
  }

  function addUser(e) {
    e.preventDefault()
    const isValid = formValidation()
    if (isValid) {
      newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
      axios
        .post("/register", newUser)
        .then(() => {
          setTrigger(false)
          navigate("/login")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
        })
        .catch((error) => console.log(error))
    }
  }

  const formValidation = () => {
    const emailError = {}
    const passwordError = {}
    let isValid = true

    if (email.trim().length > 225) {
      emailError.tooLong = "email is too long"
      isValid = false
    }
    if (!email.includes("@")) {
      emailError.noSymbol = "email needs @"
      isValid = false
    }
    if (email.trim().length < 5) {
      emailError.tooShort = "email is too short"
      isValid = false
    }
    if (password.trim().length < 8) {
      passwordError.empty = "password needs a minimum of 8 characters"
      isValid = false
    }

    setEmailError(emailError)
    setPasswordError(passwordError)

    return isValid
  }

  // Return

  return trigger ? (
    <div className="new-user">
      <div className="button-box">
        <button className="form-button" onClick={() => setTrigger(false)}>
          x
        </button>
      </div>
      <form className="form" action="">
        <p>
          First Name:
          <input
            value={firstName}
            name="firstName"
            onChange={handleFirstChange}
            type="text"
            autoFocus
          />
        </p>
        <p>
          Last Name:
          <input
            value={lastName}
            name="lastName"
            type="text"
            onChange={handleLastChange}
          />
        </p>
        <p>
          Email*:
          <input
            value={email}
            name="email"
            type="email"
            onChange={handleEmailChange}
          />
        </p>
        {Object.keys(emailError).map((key) => {
          return <div style={{ color: "red" }}>{emailError[key]}</div>
        })}
        <p>
          Password*:
          <input
            value={password}
            name="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </p>
        {Object.keys(passwordError).map((key) => {
          return <div style={{ color: "red" }}>{passwordError[key]}</div>
        })}
        <button onClick={addUser} className="new-button">
          Submit
        </button>
        <h6>* is required</h6>
      </form>
    </div>
  ) : (
    ""
  )
}

export default NewUserModal
