require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
let { SERVER_PORT } = process.env
const {
  registerUser,
  loginUser,
  getChecklist,
  newChecklist,
  createNewTask,
  getTasks,
  deleteChecklist,
  selectChecklist,
  addTask,
  receiveTasks,
  changeTrue,
  changeFalse,
  deleteUser,
  changeEmail,
  editTask,
  deleteTask
} = require("./controller")

// Middleware
app.use(express.json())
app.use(cors())

// Put endpoints here

// NewUserModal.js
app.post("/register", registerUser)

// Login.js
app.post("/login", loginUser)

// UserAccount.js
app.delete("/delete/:id", deleteUser)
app.get("/getChecklists/:id", getChecklist) // also in Checklist.js
app.post("/newlist/:id", newChecklist)

// Checklist.js
app.get("/checklist/:id/:title", selectChecklist)
app.get("/gettasks/:id/:title", receiveTasks)
app.post("/:title/newtask", addTask)
app.delete("/deletechecklist/:listTitle", deleteChecklist)
app.put("/changeStatusTrue/:title/:id", changeTrue)
app.put("/changeStatusFalse/:title/:id", changeFalse)

// NewChecklistModal.js
app.post("/newtask", createNewTask)
app.get("/getTasks/:id/:listTitle", getTasks)

// Navbar.js
app.put("/email/:id", changeEmail)

// Edits.js
app.put("/editTask/:id", editTask)

// TaskCard.js
app.delete("/deleteTask/:id/:title/:eid", deleteTask)

app.use(express.static(path.resolve(__dirname, "../build")))
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})

const PORT = process.env.PORT || SERVER_PORT

app.listen(PORT, () => console.log(`server running on ${PORT}`))
