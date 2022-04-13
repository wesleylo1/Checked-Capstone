import React, { createContext, useState } from "react"
import Main from "./components/Main"
import "./styles/App.css"

export const ThemeContext = createContext(null)

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id="light">
        <Main theme={theme} toggleTheme={toggleTheme} />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
