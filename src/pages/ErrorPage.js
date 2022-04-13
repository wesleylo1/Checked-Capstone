import React from "react"
import { Link } from "react-router-dom"

function ErrorPage({ theme }) {
  return (
    <div id={theme}>
      <h1>
        Oops! Click <Link to="/">here</Link> to go back to the home page
      </h1>
    </div>
  )
}

export default ErrorPage
