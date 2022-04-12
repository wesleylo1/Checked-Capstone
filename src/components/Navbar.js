import axios from "axios"
import React, { useState } from "react"
import "../styles/Navbar.css"
import { Button } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import CloseIcon from "@mui/icons-material/Close"

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
            <CloseIcon
              color="primary"
              onClick={() => {
                setFormPopup(false)
              }}
            />
          </div>
          <h2 style={{ marginTop: "1em" }}>New Email</h2>
          <form>
            <input
              style={{ marginRight: "2em", marginTop: "2em" }}
              value={email}
              onChange={emailChange}
              name="newEmail"
              type="email"
            />
            <Button type="submit" variant="contained" onClick={changeEmail}>
              Submit
            </Button>
          </form>
        </div>
      ) : (
        ""
      )}
      {/* Popup End */}
      <div className="dropdown">
        <Button
          color="primary"
          variant="contained"
          className="dropbtn"
          onClick={handleClick}
        >
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
