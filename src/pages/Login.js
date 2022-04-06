import axios from "axios"
import React, { useState } from "react"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"
import { TextField } from "@mui/material"

function Login({ setUserHandler, authenticate }) {
  let navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function showInfo(e) {
    e.preventDefault()
    authenticate()

    let userLogin = {
      email: "",
      password: ""
    }
    userLogin.email = email
    userLogin.password = password

    axios
      .post("/login", userLogin)
      .then((res) => {
        switch (res.status) {
          case 401:
            alert(res.data)
            break

          case 200:
            setUserHandler(res.data)
            navigate(`/user/${res.data.name}`)
            break

          default:
            setEmail("")
            setPassword("")
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="login">
      <form className="login-form">
        <TextField
          className="login-input"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          name="email"
          type="email"
          onChange={handleEmailChange}
          autoFocus
          required
        />

        <TextField
          className="login-input"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          name="password"
          type="password"
          onChange={handlePasswordChange}
          required
        />

        <button className="login-button" onClick={showInfo}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
