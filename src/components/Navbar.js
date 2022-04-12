import axios from "axios"
import React, { useState } from "react"
import "../styles/Navbar.css"
import { Button } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

function Navbar({ logout, deleteAcct, id }) {
  const [formPopup, setFormPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const openEmail = () => {
    setFormPopup(true)
    handleClose()
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
      {/* Popup start */}
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
      {/* Popup End */}
      <div className="dropdown">
        <Button variant="contained" className="dropbtn" onClick={handleClick}>
          Settings
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button"
          }}
        >
          <MenuItem onClick={deleteAcct}>Delete Account</MenuItem>
          <MenuItem onClick={openEmail}>Change Email</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
