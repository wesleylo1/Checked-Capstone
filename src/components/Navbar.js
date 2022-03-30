import React from "react"
import "../styles/Navbar.css"

function Navbar({ logout }) {
  return (
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">Settings</button>
        <div className="dropdown-content">
          <button>Edit Password</button>
          <button>Delete Account</button>
          <button>Change Email</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
