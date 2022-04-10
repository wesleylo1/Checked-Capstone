import React, { useState } from "react"
import axios from "axios"
import Edits from "../Edits"

function TaskCard({ element, title, id, setTasks }) {
  const [newTask, setNewTask] = useState("")
  const [formPopup, setFormPopup] = useState(false)

  return (
    <li key={element.id}>
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
      <div>
        <input
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
          id={element.id}
          defaultChecked={element.completion}
        />
        <label htmlFor={element.id}>{element.tasks}</label>
        <button
          onClick={() => {
            setFormPopup(true)
          }}
        >
          edit
        </button>
      </div>
    </li>
  )
}

export default TaskCard
