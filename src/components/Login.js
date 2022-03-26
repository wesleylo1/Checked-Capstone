import React, { useState } from "react"
import "../styles/Login.css"

function Login() {
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

    alert(`email: ${email} password: ${password}`)
    setEmail("")
    setPassword("")
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
        <button onClick={showInfo}>Next</button>
      </form>
    </div>
  )
}

export default Login
