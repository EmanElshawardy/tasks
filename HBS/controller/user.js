const fs = require('fs')
//read from file
readData = () =>{
    let data
    try{
        data = JSON.parse( fs.readFileSync('model/data.json'))
        if(!Array.isArray(data)) throw new Error('data not an array')
    }
    catch(e){
        data = []
        console.log(`kan fe error fa 7atena array fady ${e}`)
    }
    return data
}
//write to file
writeData = (allUsers) =>{
    try{
        fs.writeFileSync('model/data.json', JSON.stringify(allUsers))
    }
    catch(e){
        console.log(`error in write to file ${e}`)
    }
}
class UserController{
    static goAll(req,res){
        res.redirect('/all')
    }
    static showAll(req, res){
        let allUsers= readData()
        let data = {
            pageTitle: "show all users",
            allUsers,
            userStatus: allUsers.length>0? true: false
        }
        res.render('all', data)
    }
    static showSingle(req, res){
        let data = { pageTitle: "show Single User", user:false }
        let id = req.params.id
        let allUsers = readData()
        let user = allUsers.find(el=> el.id == id)
        if( user ) data.user=user
        res.render('single', data)
    }
    static edit(req, res){
        const id = req.params.id
        let data = {
            pageTitle: "edit user",
            id,
        }
        res.render('edit', data)
    }
    static updateUser(req,res){
        const data = {id:req.params.id,name:req.body.userName,age:req.body.age,email:req.body.email}
        let all = readData()
        let person = all.findIndex(ele=>ele.id==req.params.id)
        all[person].name=data.name
        all[person].age = data.age
        all[person].email = data.email
        writeData(all);
        res.redirect('/all');
        
    }
    
    static del(req, res){
        const id = req.params.id;
        let all = readData();
        all = all.filter(ele=>ele.id!=id)
        writeData(all);
        let data = {
            pageTitle: "show all users",
            allUsers:all,
            userStatus: all.length>0? true: false
        }
        res.render('all',data)

    }
    static add(req, res){
        let data = { pageTitle: "Add new user"}
        if(req.query.userName){
            let user = { id: Date.now(), name: req.query.userName, age: req.query.age,email: req.query.email }
            let allUsers = readData()
            allUsers.push(user)
            writeData(allUsers)
            res.redirect('/all')
       }
       else{
        res.render('add', data)
       }
    }
    static addPost(req,res){
        let data = { pageTitle: "Add new user"}
        res.render('addPost', data)
    }
    static sendData(req,res){
        let user = { id: Date.now(), name: req.body.userName, age: req.body.age,email: req.body.email }
        let allUsers = readData()
        allUsers.push(user)
        writeData(allUsers)
        res.redirect('/all')
}
}
module.exports = UserController