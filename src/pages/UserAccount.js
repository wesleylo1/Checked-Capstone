import React, { useEffect, useState } from "react"
import "../styles/UserAccount.css"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import Checklist from "../components/checklists/Checklist"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ChecklistModal from "../components/checklists/ChecklistModal"
import "../styles/UserAccount.css"

function UserAccount({ currentuser, setAuth }) {
  let { firstName } = useParams()
  let capsFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  // get info from database with their id
  const [checklists, setChecklists] = useState([])
  const [formPopup, setFormPopup] = useState(false)
  const [listTitle, setListTitle] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const navigate = useNavigate()

  const logout = () => {
    setAuth(null)
    navigate("/")
  }

  const changeInput = (e) => {
    setListTitle(e.target.value)
    setNewTitle(e.target.value)
  }

  // useEffect(() => {
  //   axios
  //     .get(`/getChecklist/${currentuser.id}`)
  //     .then((res) => {
  //       setChecklists(res.data)
  //     })
  //     .catch((err) => console.log(err))
  // }, [currentuser.id])

  const createNewChecklist = (e) => {
    e.preventDefault()
    setFormPopup(true)
    axios
      .post(`/newlist/${currentuser.id}`, { title: listTitle })
      .then((res) => {
        console.log(res.data)
        setNewTitle("")
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <Navbar logout={logout} />
      <h1>Welcome {capsFirstName}! </h1>
      <ChecklistModal
        id={currentuser.id}
        listTitle={listTitle}
        trigger={formPopup}
        setTrigger={setFormPopup}
      />
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
      <div className="checklist-rectangle">
        <form>
          <button className="checklist-add-nl" onClick={createNewChecklist}>
            +
          </button>
          <input
            value={newTitle}
            onChange={changeInput}
            type="text"
            placeholder="New list"
          />
        </form>
      </div>
    </div>
  )
}

export default UserAccount
