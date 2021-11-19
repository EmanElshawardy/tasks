const express=require('express')
const router = express.Router()
const dbConnection = require('../src/controller/dbConnection')
const {ObjectId} = require('mongodb')
router.get("",(req,res)=>{
    res.redirect('/showAll')
})
router.get('/add', (req,res)=>{
    res.render('add', {title: "add new user"})
})

router.post('/add', (req,res)=>{
    data = req.body
    data.balance = Number(data.balance)
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('users').insertOne(data, (e,d)=>{
            if(e) res.send(e)
            res.redirect('/showAll')
        })
    })
})
router.get('/showAll', (req,res)=>{
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('users').find().toArray((e,  d)=>{
            if(e) res.send(e)
            res.render('all', {
                title:"all Data",
                allusers: d,
                isEmpty: d.length?false:true
            })
        
        })
        })
})
router.get('/showclient/:id' , (req,res) =>{
//     let users = customerController.showUser(req.params.id);
//  //    console.log("hi",users)
//      res.render('showclient' , {
//          title:"show client",
//          users
//          // , isEmpty: users.length?false:true
id = req.params.id
dbConnection((error, response)=>{
    if(error) res.send('database error')
    response.collection('users').findOne({_id: new ObjectId(id)},((e,  d)=>{
        if(e) res.send(e)
        res.render('showclient', {
            title:"show client",
            allusers: d,
            isEmpty: d.length?false:true
        })
    
    }))
    })
 })
// router.get('/single/:id', (req,res)=>{
//     id = req.params.id
//     dbConnection((error, response)=>{
//         if(error) res.send('database error')
//         response.collection('users').findOne({_id: new ObjectId(id)}, ((e,  d)=>{
//             if(e) res.send(e)
//             res.render('single', {
//                 title:"all Data",
//                 allusers: d
//              })
//             }))
//         })        
    
// })

router.post('/delete/:id', (req,res)=>{
    id=req.params.id
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('users').deleteOne({_id:new ObjectId(id)})
        .then(()=>res.redirect('/showAll'))
        .catch(()=>res.send('cann\'t delete'))
    })

    res.redirect('/showAll')
})

router.get('/edit/:id', (req,res)=>{
    id = req.params.id
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('users').findOne({_id: new ObjectId(id)}, ((e,  d)=>{
            if(e) res.send(e)
            res.render('edit', {
                title:"all Data",
                user: d
             })
            }))
        })        

})
router.post('/edit/:id', (req,res)=>{
    id=req.params.id
    data = req.body
    // console.log(data)
    dbConnection((error, response)=>{
        if(error) res.send('database error')
        response.collection('users').updateOne(
            {_id:new ObjectId(id)},
            { $set:data}
       
    )
    .then(()=>res.redirect('/showAll'))
    .catch(()=>res.send('cann\'t edite'))

    })

})

router.get('/deposit/:id' , (req,res) =>{
    res.render("deposit");
})

router.post('/deposit/:id' ,async (req,res) =>{
    id=req.params.id
    data = req.body.deposit
    // console.log(data)
    dbConnection(async(error, response)=>{
        if(error) res.send('database error')
        response.collection('users').updateOne({_id:new ObjectId(id)}, {
               $inc:{
balance: Number(data)
               }
           })
           .then(()=> res.redirect('/showAll'))
           .catch((e)=>console.log(e))


        })
    })
 
router.get('/withdraw/:id' , (req,res) =>{
        res.render("withdraw");
    })   
router.post('/withdraw/:id' ,async (req,res) =>{
        id=req.params.id
        data = req.body.withdraw
        console.log(data)
 dbConnection(async(error, response)=>{
            if(error) res.send('database error')
            response.collection('users').updateOne({_id:new ObjectId(id)}, {
                   $inc:{
    balance: Number(-data)
                   }
               })
               .then(()=> res.redirect('/showAll'))
               .catch((e)=>console.log(e))
    
    
            })
        })

module.exports = router