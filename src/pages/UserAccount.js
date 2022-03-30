import React, { useEffect, useState } from "react"
import "../styles/UserAccount.css"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import Checklist from "../components/checklists/Checklist"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function UserAccount({ currentuser, setAuth }) {
  let { firstName } = useParams()
  let capsFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  // get info from database with their id
  const [checklists, setChecklists] = useState([])
  const navigate = useNavigate()

  const logout = () => {
    setAuth(null)
    navigate("/")
  }

  useEffect(() => {
    axios
      .get(`/getChecklist/${currentuser.id}`)
      .then((res) => {
        setChecklists(res.data)
      })
      .catch((err) => console.log(err))
  }, [currentuser.id])

  return (
    <div>
      <Navbar logout={logout} />
      <h1>Welcome {capsFirstName}! </h1>
      {checklists.map((element) => {
        return (
          <Checklist
            key={element.id}
            task={element.tasks}
            completion={element.completion}
            title={element.title}
          />
        )
      })}
    </div>
  )
}

export default UserAccount
