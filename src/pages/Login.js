import axios from "axios"
import React, { useState } from "react"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"

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
      <form action="">
        <p>
          Email:
          <input
            value={email}
            name="email"
            type="email"
            onChange={handleEmailChange}
            autoFocus
          />
        </p>
        <p>
          Password:
          <input
            value={password}
            name="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </p>
        {/* <Link to="/user"> */}
        <button className="login-button" onClick={showInfo}>
          Log In
        </button>
        {/* </Link> */}
      </form>
    </div>
  )
}

export default Login
