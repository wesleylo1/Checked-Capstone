import React, { useState } from "react"
import "../styles/Home.css"
import NewUserModal from "../components/NewUserModal"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

function Home() {
  const [formPopup, setFormPopup] = useState(false)

  function newCard() {
    setFormPopup(true)
  }

  return (
    <div className="home">
      <h1>Checked!</h1>

      <Link to="/login">
        <Button variant="contained" className="login-btn">
          Log in
        </Button>
      </Link>
      <Button color="primary" onClick={newCard}>
        New User?
      </Button>
      <NewUserModal trigger={formPopup} setTrigger={setFormPopup} />
    </div>
  )
}

export default Home
