const mongoose = require("mongoose")
const task = new mongoose.model('Task', {
    title:{
        type:String,
        required:true,
        unique:true,
        maxlength:40,
        trim:true
    },
    content:{
        type:String,
        trim:true,
        required:true
    },
    dueDate:{
        type:Date,
        validate(value){
            if(value<(Date.now()+1)) throw new Error("date error")
        }
    },
    status:{
        type:String,
        enum:['done', 'running', 'starting', 'not start'],
        required:true
    }
})

module.exports = task