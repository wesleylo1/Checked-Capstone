import React, { useState } from "react"
import Login from "./components/Login"
import NewUserModal from "./components/NewUserModal"
import "./styles/App.css"

function App() {
  const [formPopup, setFormPopup] = useState(false)

  function newCard() {
    setFormPopup(true)
  }

  return (
    <div className="app">
      <NewUserModal trigger={formPopup} setTrigger={setFormPopup} />
      <h1>Checked!</h1>
      <Login />
      <button onClick={newCard}>New User?</button>
    </div>
  )
}

export default App
