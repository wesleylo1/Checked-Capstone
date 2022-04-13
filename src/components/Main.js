import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import UserAccount from "../pages/UserAccount"
import ErrorPage from "../pages/ErrorPage"
import Login from "../pages/Login"

function Main({ theme, toggleTheme }) {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  })

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
    setUser({ id: userId, name: userName, email: userEmail })
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Home theme={theme} toggleTheme={toggleTheme} />}
      />
      <Route
        path="login"
        element={
          <Login
            toggleTheme={toggleTheme}
            theme={theme}
            authenticate={() => setAuth(true)}
            setUserHandler={setUserHandler}
          />
        }
      />

      {auth && (
        <Route
          path="/user/:firstName"
          element={
            <UserAccount
              toggleTheme={toggleTheme}
              theme={theme}
              currentuser={user}
              auth={auth}
              setAuth={setAuth}
            />
          }
        />
      )}

      <Route
        path="*"
        element={
          <ErrorPage
            toggleTheme={toggleTheme}
            theme={theme}
            to={auth ? "/login/:firstName" : "/login"}
          />
        }
      />
    </Routes>
  )
}

export default Main
