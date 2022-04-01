require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4000
const {
  registerUser,
  loginUser,
  getChecklist,
  newChecklist,
  createNewTask,
  getTasks,
  deleteChecklist,
  selectChecklist
} = require("./controller")

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "/public")))

// Put endpoints here
app.post("/register", registerUser)
app.post("/login", loginUser)
app.get("/getChecklists/:id", getChecklist)
app.post("/newlist/:id", newChecklist)
app.post("/newtask", createNewTask)
app.get("/getTasks/:id/:listTitle", getTasks)
app.delete("/deletechecklist/:listTitle", deleteChecklist)
app.get("/checklist/:id/:title", selectChecklist)

app.listen(PORT, () => console.log(`server running on ${PORT}`))
