const fs = require('fs')

class Task {
    balance=0
    myData = null
    readData(){
        try{
            this.myData = JSON.parse(fs.readFileSync('src/model/data.json').toString())
            if(!Array.isArray(this.myData)) throw new Error('')
        }
        catch(e){
            this.myData=[]
        }
    }

    writeData(){
        fs.writeFileSync('src/model/data.json', JSON.stringify(this.myData))
    }

    addData(name ,City,street,building,balance){     
        let info = { 
            _id: new Date().getTime(),
            name , City,street,building,balance,trans:[{type:"Balance",amount:balance}]
        }
        this.readData()
        this.myData.push(info)
        this.writeData()    
    }

    Deposit (userId,x){  
        this.readData()
        let customer = this.myData.findIndex(user =>  user._id == userId)
        if(customer==-1) { console.log('not found');}
        else{
            this.readData()
            this.myData[customer].balance = parseInt( this.myData[customer].balance)
        
           this.myData[customer].balance +=  parseInt(x)
           this.myData[customer].trans.push({type:"Deposit",amount:x})
           this.writeData()
        }
    }


    Withdrawal(userId,x){
        // let  y = argv.y ; 
        // this.readData()
        // let customer = this.myData.findIndex(user =>  user.id== argv.id)
        // if(customer==-1) { console.log('not found');}
        // else{
        //     this.readData()
        //     this.myData.forEach(user =>{
                
        //             if ( argv < 6000 ){
        //                 console.log('you can not get money ')
        //             }
        //             else {
        //                 user.balance -= y
        //                 this.writeData()  
        //             }    
        //         }
        //     )    
        this.readData()
        let customer = this.myData.findIndex(user =>  user._id == userId)
        if(customer>=100 && customer<=6000) { console.log('not found');}
        else{
            this.readData()
            this.myData[customer].balance = parseInt( this.myData[customer].balance)
        
           this.myData[customer].balance -=  parseInt(x)
           this.myData[customer].trans.push({type:"Withdraw",amount:x})

           this.writeData()   
        }
    }
    searchUser(userId){
      this.readData()
        let index = this.myData.findIndex(user=> user._id == userId)
        return this.myData[index]
    }

    editUser(userId, newData){
       this.readData()
        let index =this.myData.findIndex(user=> user._id == userId)
        newData._id =this.myData[index]._id
        this.myData[index] = newData
        this.writeData()
    }

    showUser(userId){
        this.readData()
        let index = this.myData.findIndex(user=> user._id == userId)
       let data= this.myData[index]

        return data
    }
    
    delete(argv){
        this.readData()

        let x = this.myData.findIndex(user => user._id == argv)
        if(x==-1) return console.log('not found');

        this.myData.splice(x,1)
        this.writeData()
    }













}
let mytask = new Task()
module.exports = mytask