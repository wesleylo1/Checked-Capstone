import React, { useState } from "react"
import "../styles/Home.css"
import NewUserModal from "../components/NewUserModal"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import Switch from "@mui/material/Switch"

function Home({ theme, toggleTheme }) {
  const [formPopup, setFormPopup] = useState(false)

  function newCard() {
    setFormPopup(true)
  }

  return (
    <div className="home" id={theme}>
      <h1>Checked!</h1>

      <Link to="/login">
        <Button
          variant="contained"
          endIcon={<LoginIcon />}
          className="login-btn"
        >
          Log in
        </Button>
      </Link>
      <Button variant="outlined" color="primary" onClick={newCard}>
        New User?
      </Button>
      <NewUserModal trigger={formPopup} setTrigger={setFormPopup} />

      <div className="switch">
        <div className="switchTwo">
          <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </div>
  )
}

export default Home
