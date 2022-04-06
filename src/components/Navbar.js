import axios from "axios"
import React, { useState } from "react"
import "../styles/Navbar.css"

function Navbar({ logout, deleteAcct, id }) {
  const [formPopup, setFormPopup] = useState(false)
  const [email, setEmail] = useState("")

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const openEmail = () => {
    setFormPopup(true)
  }

  const changeEmail = (e) => {
    e.preventDefault()
    axios.put(`/email/${id}`, { email: email }).then((res) => {
      alert(res.data)
      setEmail("")
      setFormPopup(false)
    })
  }

  return (
    <div className="navbar">
      {formPopup ? (
        <div className="emailPopup">
          <div className="button-box">
            <button
              onClick={() => {
                setFormPopup(false)
              }}
              className="form-button"
            >
              x
            </button>
          </div>
          <h2>Change Email</h2>
          <form>
            <label htmlFor="newEmail">New Email</label>
            <input
              value={email}
              onChange={emailChange}
              name="newEmail"
              type="email"
            />
            <button onClick={changeEmail}>Submit</button>
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="dropdown">
        <button className="dropbtn">Settings</button>
        <div className="dropdown-content">
          <button onClick={deleteAcct}>Delete Account</button>
          <button onClick={openEmail}>Change Email</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
