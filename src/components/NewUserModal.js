import React, { useState } from "react"
import "../styles/NewUserModal.css"

function NewUserModal({ trigger, setTrigger }) {
  const [id, setId] = useState(0)
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let users = []

  let newUser = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  function handleFirstChange(e) {
    setFirst(e.target.value)
  }

  function handleLastChange(e) {
    setLast(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function addUser(e) {
    e.preventDefault()

    newUser.id = id
    newUser.firstName = first
    newUser.lastName = last
    newUser.email = email
    newUser.password = password

    users.push(newUser)
    console.log(users)
    setId((id) => id + 1)

    setFirst("")
    setLast("")
    setEmail("")
    setPassword("")
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
            value={first}
            type="text"
            onChange={handleFirstChange}
            autoFocus
          />
        </p>
        <p>
          Last Name:
          <input value={last} type="text" onChange={handleLastChange} />
        </p>
        <p>
          Email:
          <input value={email} type="email" onChange={handleEmailChange} />
        </p>
        <p>
          Password:
          <input
            value={password}
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
