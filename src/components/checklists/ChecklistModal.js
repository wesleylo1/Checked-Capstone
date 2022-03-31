import axios from "axios"
import React, { useEffect, useState } from "react"
import "../../styles/ChecklistModal.css"

function ChecklistModal({ trigger, setTrigger, listTitle, id }) {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const createTask = async (e) => {
    e.preventDefault()
    let info = {
      task: task,
      title: listTitle
    }
    console.log(listTitle)

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

  return trigger ? (
    <div className="checklist-modal">
      <div className="button-box">
        <button className="form-button" onClick={() => setTrigger(false)}>
          x
        </button>
      </div>
      <h1 className="cm-title">{listTitle}</h1>
      <form>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
        />
        <button onClick={createTask}>Add task</button>
      </form>

      <ul>
        {tasks.map((element) => {
          return <li key={element.id}>{element.tasks}</li>
        })}
      </ul>
    </div>
  ) : (
    ""
  )
}

export default ChecklistModal
