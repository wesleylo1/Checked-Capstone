import React from "react"
import "../../styles/Checklist.css"

function Checklist({ task, completion, title }) {
  return (
    <div>
      <div className="cl-box">
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Checklist
