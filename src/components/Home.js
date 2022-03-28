import React, { useState } from "react"
import "../styles/Home.css"
import NewUserModal from "./NewUserModal"
import Login from "./Login"

function Home() {
  const [formPopup, setFormPopup] = useState(false)

  function newCard() {
    setFormPopup(true)
  }

  return (
    <div className="home">
      <NewUserModal trigger={formPopup} setTrigger={setFormPopup} />
      <h1>Checked!</h1>
      <Login />
      <button onClick={newCard}>New User?</button>
    </div>
  )
}

export default Home
