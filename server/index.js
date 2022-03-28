require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000
const { registerUser, loginUser } = require("./controller")

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "/public")))

// Put endpoints here
app.post("/register", registerUser)
app.post("/login", loginUser)

app.listen(port, () => console.log(`server running on ${port}`))
