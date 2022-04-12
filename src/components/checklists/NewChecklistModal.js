import axios from "axios"
import React, { useState } from "react"
import "../../styles/NewChecklistModal.css"
import TaskCard from "./TaskCard"
import AddIcon from "@mui/icons-material/Add"
import { Button } from "@mui/material"

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

  return trigger ? (
    <div className="new-checklist-modal">
      <div className="button-box">
        <Button className="form-button" onClick={exitModal}>
          x
        </Button>
      </div>
      <h1 className="cm-title">{listTitle}</h1>
      <form>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          autoFocus
        />
        <Button onClick={createTask}>
          <AddIcon fontSize="small" /> Add task
        </Button>
      </form>

      <ul>
        {tasks.map((element) => {
          return (
            <TaskCard
              element={element}
              title={listTitle}
              id={id}
              setTasks={setTasks}
            />
          )
        })}
      </ul>
    </div>
  ) : (
    ""
  )
}

export default ChecklistModal
