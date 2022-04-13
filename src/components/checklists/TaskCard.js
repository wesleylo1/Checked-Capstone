import React, { useState } from "react"
import axios from "axios"
import Edits from "../Edits"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Checkbox } from "@mui/material"

function TaskCard({ element, title, id, tasks, taskCardId, setTasks }) {
  const [newTask, setNewTask] = useState("")
  const [formPopup, setFormPopup] = useState(false)

  const deleteTask = () => {
    setTasks(tasks.filter((element) => element.id !== taskCardId))
    axios.delete(`/deleteTask/${id}/${title}/${element.id}`)
  }

  return (
    <>
      <li key={element.id}>
        <div>
          <Checkbox
            size="small"
            color="secondary"
            onChange={() => {
              if (document.getElementById(`${element.id}`).checked === true) {
                console.log(`${element.id} checked`)
                axios
                  .put(`/changeStatusTrue/${title}/${element.id}`)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((error) => console.log(error))
              } else if (
                document.getElementById(`${element.id}`).checked === false
              ) {
                console.log(`${element.id} unchecked`)
                axios
                  .put(`/changeStatusFalse/${title}/${element.id}`)
                  .then((res) => {
                    console.log(res.data)
                  })
                  .catch((error) => console.log(error))
              }
            }}
            type="checkbox"
            id={element.id.toString()}
            defaultChecked={element.completion}
          />
          <label style={{ marginRight: "1em" }} htmlFor={element.id}>
            {element.tasks}
          </label>
          <EditIcon
            style={{ marginRight: ".5em" }}
            fontSize="small"
            onClick={() => {
              setFormPopup(true)
            }}
          />
          <DeleteIcon fontSize="small" onClick={deleteTask} />
        </div>
        {
          <Edits
            trigger={formPopup}
            setTrigger={setFormPopup}
            title={title}
            id={id}
            newTask={newTask}
            setNewTask={setNewTask}
            element={element}
            setTasks={setTasks}
          />
        }
      </li>
    </>
  )
}

export default TaskCard
