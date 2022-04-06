import React, { useState } from "react"
import "../styles/Home.css"
import NewUserModal from "../components/NewUserModal"
import { Link } from "react-router-dom"

function Home() {
  const [formPopup, setFormPopup] = useState(false)

  function newCard() {
    setFormPopup(true)
  }

  return (
    <div className="home">
      <NewUserModal trigger={formPopup} setTrigger={setFormPopup} />
      <h1>Checked!</h1>

      <Link to="/login">
        <button className="login-btn">Log in</button>
      </Link>
      <button onClick={newCard}>New User?</button>
    </div>
  )
}

export default Home
