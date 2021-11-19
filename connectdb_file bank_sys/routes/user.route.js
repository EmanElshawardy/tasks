const express = require('express')
const router = express.Router()
const userController = require('../src/controller/user.controller')
const customerController = require('../src/controller/customer.controller')
router.get('/' , (req,res) =>{
    res.redirect('/showall');
})

router.get('/add' , (req,res) =>{
    res.render('add' , {title: 'add new user'});
})

router.post('/add' , (req,res) =>{
    customerController.addData(req.body.name,req.body.City,req.body.street,req.body.building,req.body.balance)
    res.redirect('/showall')
})

router.get('/showall' , (req,res) =>{
   let allusers = userController.showAllUsers();
   
    res.render('all' , {
        title:"show all users",
        allusers,
        isEmpty: allusers.length?false:true
    })

})
router.get('/showclient/:id' , (req,res) =>{
   let users = customerController.showUser(req.params.id);
//    console.log("hi",users)
    res.render('showclient' , {
        title:"show client",
        users
        // , isEmpty: users.length?false:true
    })

})

router.get('/deposit/:id' , (req,res) =>{
    res.render("deposit");
})


router.post('/deposit/:id' , (req,res) =>{
     customerController.Deposit(req.params.id , req.body.deposit)
 
    res.redirect('/showall');
})
router.get('/Withdrawal/:id' , (req,res) =>{
    res.render("Withdrawal");
})

router.post('/Withdrawal/:id' , (req,res) =>{
     customerController.Withdrawal(req.params.id , req.body.Withdrawal)
 
    res.redirect('/showall');
})

router.post('/delete/:id' , (req,res) =>{
    customerController.delete(req.params.id);
    res.redirect('/showall');
})

router.get('/edit/:id' , (req,res) =>{
   let userdata = customerController.searchUser(req.params.id)
    res.render("edit" , {
     user: userdata,
  })
   
})
router.post('/edit/:id' , (req,res) =>{
    customerController.editUser(req.params.id , req.body)
    res.redirect('/showall')
})
module.exports = router