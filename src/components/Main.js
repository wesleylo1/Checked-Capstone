import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import UserAccount from "../pages/UserAccount"
import ErrorPage from "../pages/ErrorPage"
import Login from "../pages/Login"

function Main() {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  })
  let currentuserId = ""

  useEffect(() => {
    let u = localStorage.getItem("user")
    u && JSON.parse(u) ? setAuth(true) : setAuth(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("user", auth)
  }, [auth])

  const setUserHandler = (info) => {
    const userName = info.name
    const userId = info.id
    const userEmail = info.email
    currentuserId = info.id
    setUser({ id: userId, name: userName, email: userEmail })
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="login"
        element={
          <Login
            authenticate={() => setAuth(true)}
            setUserHandler={setUserHandler}
          />
        }
      />

      {auth && (
        <Route
          path="/user/:firstName"
          element={
            <UserAccount currentuser={user} auth={auth} setAuth={setAuth} />
          }
        />
      )}

      <Route
        path="*"
        element={<ErrorPage to={auth ? "/login/:firstName" : "/login"} />}
      />
    </Routes>
  )
}

export default Main
