import { Button } from "@mui/material"
import axios from "axios"
import React from "react"
import "../styles/Edits.css"
import CloseIcon from "@mui/icons-material/Close"

function Edits({
  trigger,
  setTrigger,
  title,
  id,
  newTask,
  setNewTask,
  element,
  setTasks,
  refreshTasks
}) {
  const exitModal = () => {
    setNewTask("")
    setTrigger(false)
  }

  const taskChange = (e) => {
    setNewTask(e.target.value)
  }
  const editTask = (e) => {
    e.preventDefault()

    axios
      .put(`/editTask/${id}`, {
        newTask: newTask,
        title: title,
        elemId: element.id
      })
      .then((res) => {
        axios
          .get(`/getTasks/${id}/${title}`)
          .then((res) => {
            let info = res.data
            setTasks(info)
          })
          .catch((err) => {
            console.log(err)
          })
        alert(res.data)
        setNewTask("")
        setTrigger(false)
      })
      .catch((error) => console.log(error))
  }
  return trigger ? (
    <div className="editModal">
      <div className="button-box">
        <CloseIcon color="primary" onClick={exitModal} />
      </div>
      <h2 style={{ marginBottom: ".5em" }}>Edit Task</h2>
      <form>
        <label htmlFor="editCurrentTask">'{element.tasks}'</label>
        <input
          style={{ marginTop: "2em" }}
          value={newTask}
          name="editCurrentTask"
          type="text"
          onChange={taskChange}
          autoFocus
        />
        <Button
          type="submit"
          style={{ marginTop: "2em" }}
          variant="contained"
          onClick={editTask}
        >
          Submit
        </Button>
      </form>
    </div>
  ) : (
    ""
  )
}

export default Edits
