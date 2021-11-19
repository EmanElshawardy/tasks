
  
const fs = require('fs')
let data = []
const readJsonFile = ()=>{
    try{
    data = JSON.parse(fs.readFileSync('src/model/data.json').toString())
    if(!Array.isArray(data)) throw new Error()
    }
    catch(e){ data = [] 
    console.log(data)}
}
const saveJsonFile = () =>{
    fs.writeFileSync('src/model/data.json', JSON.stringify(data))
}
class User{
    addNewUser(name,City,street,building, balance){
        readJsonFile()
        let newUser = {
            _id:new Date().getTime(),
            name, City , street , building , balance
        }
        data.push(newUser)
        saveJsonFile()
    }

    
    editUser(userId, newData){
        readJsonFile()
        let index = data.findIndex(user=> user._id == userId)
        newData._id = data[index]._id
        data[index] = newData
        saveJsonFile()
    }
    showAllUsers(){
        readJsonFile()
        return data
    }
    searchUser(userId){
        readJsonFile()
        let index = data.findIndex(user=> user._id == userId)
        return data[index]
    }
    deleteUser(userId){
        readJsonFile()
        let index = data.findIndex(user=> user._id === userId)
        // console.log(index)
        data.splice(index, 1)
        saveJsonFile()
    }
}

const userObj = new User()
module.exports = userObj
