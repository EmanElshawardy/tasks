const router = require("express").Router()
const Task = require('../app/controller/task.controller')
router.post('/add', Task.addTask)
router.get('/all' ,Task.getAllTasks );
router.get('/all/:id' ,Task.getSingle );
router.post('/delete/:id' , Task.deleteTask)
router.post('/edite/:id' , Task.editTask)

module.exports = router