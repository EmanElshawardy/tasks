// build in modules
const fs = require("fs")
// npm installed modules
const uniqid = require('uniqid'); 
const chalk = require("chalk")
const validator = require("validator")
// deal with json files
const writeDataToFile = (users)=>{
    fs.writeFileSync("users.json", JSON.stringify(users))
}
const readDataFromFile = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync("users.json"))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}
//end working with json
//search user by id
searchUserById = (allUsers, userId)=>{
    let index = allUsers.findIndex(user => {
        return userId == user.id
    })
    if(index==-1) throw new Error("user not found")
    return index
}
//print single user
printSingle = (user)=>{
    console.log(chalk.green(`id: ${user.id} - user name: ${user.name} - user email: ${user.email}`))
}
//print error message 
printError = (e)=>{
    console.log(chalk.red(e.message))
}
validateIsEmail = (email)=>{
    if(!validator.isEmail(email)) throw new Error("invalid Email")
}
checkUniqueData = (allUsers, data, attr, index=null) =>{
    const notUnique = allUsers.find((user, i)=> (user[attr] == data && index!=i))
    if(notUnique) throw new Error(`${attr} used before`)
}

//edit user
editUser =(id, userNewData)=>{
    try{
        let allUsers = readDataFromFile()
        let index = searchUserById(allUsers, id)
        validateIsEmail(userNewData.email)
        checkUniqueData(allUsers, userNewData.email, "email", index)    
        for(el in userNewData) allUsers[index][el]=userNewData[el]  
        writeDataToFile(allUsers)
        console.log(chalk.green("user updated"))
    }
    catch(e){
        printError(e)
    }
}

//add new user
addNewUser = (userData)=>{
    try{
        validateIsEmail(userData.email)
        const allUsers = readDataFromFile()
        checkUniqueData(allUsers, userData.email, "email")
        let user = { id:uniqid(), ...userData }
        allUsers.push(user)
        writeDataToFile(allUsers)   
        console.log(chalk.green("data added successfuly")) 
    }
    catch(e){
        printError(e)
    }
}
//get all users data
getAllData = () =>{
    const allUsers = readDataFromFile()
    if(allUsers.length==0)return console.log(chalk.red("No users yet"))
    console.log(`your file has ${allUsers.length} record`)
    allUsers.forEach(user=>printSingle(user))
}
//get single user
getSingle=(id)=>{
    try{
        let allUsers = readDataFromFile()
        let index = searchUserById(allUsers, id)
        printSingle(allUsers[index])
    }
    catch(e){
        printError(e)
    }

}
//delete user
deleteUser =(id)=>{
    try{
        let allUsers = readDataFromFile()
        let index = searchUserById(allUsers, id)
        allUsers.splice(index, 1)
        writeDataToFile(allUsers)
        console.log(chalk.green("user deleted"))
    }
    catch(e){
        printError(e)
    }
}
module.exports = { addNewUser, getAllData, getSingle, deleteUser, editUser }