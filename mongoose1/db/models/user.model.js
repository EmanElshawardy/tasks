const mongoose = require("mongoose")
const validator = require("validator")
const User = mongoose.model("User", {
    name :{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
        }
    },
    age:{
        type:Number,
        min:21,
        max:40
    },
    password:{
        type:String,
        match:'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/'
    },
    addresses:[
        {
            street:{
                type:String
            },
            buildingNo:{
                type:Number
            }
        }
    ],// : []  {street, building number}
    birthdate:{
        type:Date
    },// date 
    phone :{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    image:{
        type:String,
        trim:true
    },
    status:{
        type: Boolean,
        default:false
    }
})
module.exports = User