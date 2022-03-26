require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "/public")))

// Put endpoints here

app.listen(port, () => console.log(`server running on ${port}`))
