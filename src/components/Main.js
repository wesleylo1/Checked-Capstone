import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import UserAccount from "./UserAccount"
import ErrorPage from "./ErrorPage"

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:firstName" element={<UserAccount />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default Main
