import React, { useEffect, useState } from "react"
import "../styles/UserAccount.css"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import Checklist from "../components/checklists/Checklist"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import NewChecklistModal from "../components/checklists/NewChecklistModal"
import "../styles/UserAccount.css"

function UserAccount({ currentuser, setAuth }) {
  let { firstName } = useParams()
  let capsFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  const [checklists, setChecklists] = useState([])
  const [formPopup, setFormPopup] = useState(false)
  const [listTitle, setListTitle] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const navigate = useNavigate()

  const deleteAcct = () => {
    axios
      .delete(`/delete/${currentuser.id}`)
      .then((res) => {
        alert(res.data)
        setAuth(null)
        navigate("/")
      })
      .catch((error) => console.log(error))
  }

  const logout = () => {
    setAuth(null)
    navigate("/")
  }

  const changeInput = (e) => {
    setListTitle(e.target.value)
    setNewTitle(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`/getChecklists/${currentuser.id}`)
      .then((res) => {
        setChecklists(res.data)
      })
      .catch((err) => console.log(err))
  }, [currentuser.id, formPopup, setFormPopup])

  useEffect(() => {
    return () => {
      console.log("cleaned up")
    }
  }, [])

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
    <div className="useraccount">
      <Navbar logout={logout} deleteAcct={deleteAcct} id={currentuser.id} />
      <h1>Welcome {capsFirstName}! </h1>
      <NewChecklistModal
        id={currentuser.id}
        listTitle={listTitle}
        trigger={formPopup}
        setTrigger={setFormPopup}
      />
      <main className="cl-main">
        {checklists.map((element) => {
          return (
            <Checklist
              key={element.id}
              setChecklists={setChecklists}
              id={currentuser.id}
              task={element.tasks}
              title={element.table_name}
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
      </main>
    </div>
  )
}

export default UserAccount
