import axios from "axios"
import React, { useState } from "react"
import "../../styles/NewChecklistModal.css"

function ChecklistModal({ trigger, setTrigger, listTitle, id }) {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const createTask = async (e) => {
    e.preventDefault()
    let info = {
      task: task,
      title: listTitle
    }

    await axios
      .post("/newtask", info)
      .then((res) => {
        console.log(res.data)
        setTask("")
      })
      .catch((err) => console.log(err))

    await axios
      .get(`/getTasks/${id}/${listTitle}`)
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const exitModal = () => {
    setTasks([])
    setTrigger(false)
  }

  const deleteChecklist = () => {
    setTrigger(false)
    axios
      .delete(`/deletechecklist/${listTitle}`)
      .then((res) => {
        console.log(res.data)
        setTasks([])
      })
      .catch((err) => console.log(err))
  }

  return trigger ? (
    <div className="new-checklist-modal">
      <div className="button-box">
        <button className="form-button" onClick={exitModal}>
          x
        </button>
      </div>
      <h1 className="cm-title">{listTitle}</h1>
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
