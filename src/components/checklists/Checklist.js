import axios from "axios"
import React, { useState } from "react"
import "../../styles/Checklist.css"
import TaskCard from "./TaskCard"
import AddIcon from "@mui/icons-material/Add"
import { Button } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

function Checklist({ title, id, setChecklists }) {
  const [formPopup, setFormPopup] = useState(false)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")
  const [boolean, setBoolean] = useState(false)

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
            <CloseIcon
              color="primary"
              onClick={() => {
                setTasks([])
                setFormPopup(false)
              }}
            />
          </div>

          <h2>{title.replace(/_/g, " ")}</h2>

          <form>
            <input
              style={{ marginRight: "2em", marginBottom: "2em" }}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              type="text"
              autoFocus
            />
            <Button
              size="small"
              type="submit"
              variant="contained"
              startIcon={<AddIcon fontSize="small" />}
              onClick={createTask}
            >
              Add task
            </Button>
          </form>

          <ul>
            {tasks.map((element) => {
              return (
                <TaskCard
                  tasks={tasks}
                  boolean={boolean}
                  setBoolean={setBoolean}
                  key={element.id}
                  taskCardId={element.id}
                  element={element}
                  title={title}
                  id={id}
                  setTasks={setTasks}
                  refreshTasks={refreshTasks}
                />
              )
            })}
          </ul>

          <Button
            size="small"
            style={{ marginTop: "2em" }}
            variant="contained"
            onClick={deleteChecklist}
          >
            Delete
          </Button>
        </div>
      ) : (
        ""
      )}
      <div onClick={openChecklist} className="cl-box">
        <h2 key={id.toString()}>{title.replace(/_/g, " ")}</h2>
      </div>
    </div>
  )
}

export default Checklist
