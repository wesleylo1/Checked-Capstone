import axios from "axios"
import React, { useState } from "react"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"
import Switch from "@mui/material/Switch"

function Login({ setUserHandler, authenticate, theme, toggleTheme }) {
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
    <div className="login" id={theme}>
      <form className="login-form">
        <TextField
          color="secondary"
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
          color="secondary"
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="login-button"
          onClick={showInfo}
        >
          Log In
        </Button>
      </form>
      <div className="switch">
        <div className="switchTwo">
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </div>
  )
}

export default Login
