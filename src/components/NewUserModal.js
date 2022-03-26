import React, { useState } from "react"
import "../styles/NewUserModal.css"
// import axios from "axios"

function NewUserModal({ trigger, setTrigger }) {
  const [id, setId] = useState(1)
  const [last, setLast] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let users = []

  let newUser = {
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  function handleFirstChange(e) {
    let key = e.target.name
    newUser[key] = e.target.value
  }

  function handleLastChange(e) {
    setLast(e.target.value)
    newUser.lastName = last
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
    newUser.email = email
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
    newUser.password = password
  }

  function addUser(e) {
    e.preventDefault()

    users.push(newUser)
    console.log(users)
    setId((id) => id + 1)

    setTrigger(false)
    alert("user created")
  }

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
            name="firstName"
            onChange={handleFirstChange}
            type="text"
            autoFocus
          />
        </p>
        <p>
          Last Name:
          <input name="lastName" type="text" onChange={handleLastChange} />
        </p>
        <p>
          Email:
          <input name="email" type="email" onChange={handleEmailChange} />
        </p>
        <p>
          Password:
          <input
            name="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </p>
        <button className="new-button" onClick={addUser}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    ""
  )
}

export default NewUserModal
