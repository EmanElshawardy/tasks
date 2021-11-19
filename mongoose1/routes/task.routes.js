const router = require("express").Router()
const Task = require('../app/controller/task.controller')
router.post('/add', Task.addTask)

module.exports = router