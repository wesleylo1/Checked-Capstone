import axios from "axios"
import React, { useState } from "react"
import "../../styles/Checklist.css"
import ChecklistModal from "./ChecklistModal"

function Checklist({ task, title, number }) {
  const [formPopup, setFormPopup] = useState(false)
  const [tasks, setTasks] = useState([])

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

  return (
    <div>
      <ChecklistModal
        trigger={formPopup}
        setTrigger={setFormPopup}
        title={title}
        id={number}
        tasks={tasks}
      />
      <div onClick={openChecklist} className="cl-box">
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Checklist
