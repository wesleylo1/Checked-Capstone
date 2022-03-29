import React from "react"
import "../styles/UserAccount.css"
import Navbar from "./Navbar"
import { useParams } from "react-router-dom"

function UserAccount() {
  let { firstName } = useParams()

  let capsFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  return (
    <div>
      <h1>This is the profile page for {capsFirstName} ! </h1>
      <Navbar />
    </div>
  )
}

export default UserAccount
