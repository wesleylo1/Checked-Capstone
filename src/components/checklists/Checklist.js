import axios from "axios"
import React, { useState } from "react"
import "../../styles/Checklist.css"
import TaskCard from "./TaskCard"

function Checklist({ title, id, setChecklists }) {
  const [formPopup, setFormPopup] = useState(false)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  const openChecklist = () => {
    setFormPopup(true)
    axios
      .get(`/checklist/${id}/${title}`)
      .then((res) => {
        setTasks([])
        setTasks(res.data)
      })
      .catch((err) => console.log(err))
  }

  const createTask = async (e) => {
    e.preventDefault()

    await axios
      .post(`/${title}/newtask`, { task: task })
      .then((res) => {
        console.log(res.data)
        setTask("")
        axios
          .get(`/gettasks/${id}/${title}`)
          .then((res) => {
            setTasks(res.data)
          })
          .catch((err) => {
            console.log(err)
          })

        console.log("complete")
      })
      .catch((err) => console.log(err))
  }

  const refreshTasks = () => {
    axios
      .get(`/gettasks/${id}/${title}`)
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    console.log("complete")
  }

  const deleteChecklist = () => {
    axios.delete(`/deletechecklist/${title}`).then(
      axios
        .get(`/getChecklists/${id}`)
        .then((res) => {
          setChecklists(res.data)
          setFormPopup(false)
        })
        .catch((error) => console.log(error))
    )
  }

  return (
    <div>
      {formPopup ? (
        <div className="checklist-modal">
          <div className="button-box">
            <button
              onClick={() => {
                setTasks([])
                setFormPopup(false)
              }}
              className="form-button"
            >
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
                <TaskCard
                  element={element}
                  title={title}
                  id={id}
                  setTasks={setTasks}
                  refreshTasks={refreshTasks}
                />
              )
            })}
          </ul>

          <button onClick={deleteChecklist}>Delete</button>
        </div>
      ) : (
        ""
      )}
      <div onClick={openChecklist} className="cl-box">
        <h1 key={id}>{title}</h1>
      </div>
    </div>
  )
}

export default Checklist
