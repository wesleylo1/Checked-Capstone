import React from "react"
import "../styles/NewUserModal.css"

function NewUserModal() {
  return (
    <div className="new-user">
      <form action="">
        <p>
          First Name:
          <input type="text" />
        </p>
        <p>
          Last Name:
          <input type="text" />
        </p>
        <p>
          Email:
          <input type="email" />
        </p>
        <p>
          Password:
          <input type="password" />
        </p>
      </form>
    </div>
  )
}

export default NewUserModal
