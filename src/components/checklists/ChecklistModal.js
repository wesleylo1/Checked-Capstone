import React, { useEffect, useState } from "react"
import "../../styles/ChecklistModal.css"
import axios from "axios"

function ChecklistModal({ trigger, setTrigger, title, id, tasks }) {
  const [task, setTask] = useState("")
  const [items, setItems] = useState([])

  const createTask = async (e) => {
    e.preventDefault()
    let info = {
      task: task,
      title: title
    }

    await axios
      .post("/newtask", info)
      .then((res) => {
        console.log(res.data)
        setTask("")
      })
      .catch((err) => console.log(err))

    await axios
      .get(`/getTasks/${id}/${title}`)
      .then((res) => {
        setItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const exitModal = () => {
    setTrigger(false)
  }

  const deleteChecklist = () => {
    setTrigger(false)
    axios
      .delete(`/deletechecklist/${title}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  return trigger ? (
    <div className="checklist-modal">
      <div className="button-box">
        <button onClick={exitModal} className="form-button">
          x
        </button>
      </div>

      <h1>{title}</h1>

      <form>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          autoFocus
        />
        <button onClick={createTask}>Add task</button>
      </form>

      <ul>
        {tasks.map((element) => {
          return (
            <div>
              <input key={element.id} type="checkbox" id={element.id} />
              <label htmlFor={element.id}>{element.tasks}</label>
            </div>
          )
        })}
      </ul>
      <button onClick={deleteChecklist}>Delete</button>
    </div>
  ) : (
    ""
  )
}

export default ChecklistModal
