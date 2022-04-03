import axios from "axios"
import React, { useState } from "react"
import "../../styles/Checklist.css"
import "../../styles/ChecklistModal.css"

function Checklist({ title, number }) {
  const [formPopup, setFormPopup] = useState(false)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")
  const [checked, setChecked] = useState(false)

  const openChecklist = () => {
    setFormPopup(true)
    axios
      .get(`/checklist/${number}/${title}`)
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
      })
      .catch((err) => console.log(err))

    await axios
      .get(`/gettasks/${number}/${title}`)
      .then((res) => {
        setTasks(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteChecklist = () => {
    setFormPopup(false)
    axios
      .delete(`/deletechecklist/${title}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      {formPopup ? (
        <div className="checklist-modal">
          <div className="button-box">
            <button onClick={() => setFormPopup(false)} className="form-button">
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
                  <input
                    onChange={() => {
                      setChecked(!checked)
                      if (checked === false) {
                        axios.post(`/changeStatusTrue/${title}/${element.id}`)
                      } else {
                        axios.post(`/changeStatusFalse/${title}/${element.id}`)
                      }
                    }}
                    key={element.id}
                    type="checkbox"
                    id={element.id}
                  />
                  <label htmlFor={element.id}>{element.tasks}</label>
                </div>
              )
            })}
          </ul>
          <button onClick={deleteChecklist}>Delete</button>
        </div>
      ) : (
        ""
      )}
      <div onClick={openChecklist} className="cl-box">
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Checklist
