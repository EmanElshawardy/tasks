const router = require("express").Router()
const user = require('../app/controller/user.controller')
router.post("/register", user.Register)
router.get("/allUsers", user.showAll)
router.get('/allUsers/:id', user.showSingle)
router.delete('/allUsers', user.delAll)
router.delete('/allUsers/:id', user.delSingle)
router.patch("/allUsers/:id", user.addAddres)
module.exports = router