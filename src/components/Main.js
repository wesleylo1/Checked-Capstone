import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import UserAccount from "./UserAccount"

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserAccount />} />
    </Routes>
  )
}

export default Main
