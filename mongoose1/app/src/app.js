const express = require('express')
const app = express()
require('../../db/dbConnection')
app.use(express.json())
const userRoutes = require("../../routes/user.routes")
app.use("/api", userRoutes)
const taskRoutes = require("../../routes/task.routes")
app.use("/api", taskRoutes)
module.exports = app