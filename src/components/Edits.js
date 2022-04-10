import axios from "axios"
import React from "react"
import "../styles/Edits.css"

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
        alert(res.data)
        setNewTask("")
        setTrigger(false)
      })
      .catch((error) => console.log(error))
    axios
      .get(`/getTasks/${id}/${title}`)
      .then((res) => {
        let info = res.data
        setTasks(info)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return trigger ? (
    <div className="editModal">
      <div className="button-box">
        <button className="form-button" onClick={exitModal}>
          x
        </button>
      </div>
      <h2>{title}</h2>
      <form>
        <label htmlFor="editCurrentTask">Edit task: '{element.tasks}'</label>
        <input
          value={newTask}
          name="editCurrentTask"
          type="text"
          onChange={taskChange}
          autoFocus
        />
        <button onClick={editTask}>Submit</button>
      </form>
    </div>
  ) : (
    ""
  )
}

export default Edits
