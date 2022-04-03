import React from "react"

function Checkbox({ label, onChange, value, id, special }) {
  return (
    <div>
      <input
        type="checkbox"
        onChange={onChange}
        checked={value}
        key={special}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox
