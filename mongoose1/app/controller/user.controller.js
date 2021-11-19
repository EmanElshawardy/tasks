const userModel = require("../../db/models/user.model")

class User{
    static Register =  async(req,res)=>{
        try{
            const user = new userModel(req.body)
            await user.save()
            res.send({
                apiStatus:true,
                data: user,
                message: "data inserted successfuly"
            })
        }
        catch(e){
            res.send({
                apiStatus:false,
                data:e.message,
                message:"error in adding data"
            })
        }
    }
    static showAll = async(req, res)=>{
        try{
            const allUsers = await userModel.find()
            res.send({
                apiStatus:true,
                data:allUsers,
                message:"all users fetched"
            })
        }
        catch(e){
            res.send({
                apiStatus:false,
                data:e.message,
                message:"error loading users data"
            })
        }
    }
    static showSingle =async(req,res)=>{
        try{
            const user = await userModel.findById(req.params.id)
            if(!user) throw new Error("user not found")
            res.send({
                apiStatus:true,
                data:user,
                message:"all users fetched"
            })
        }
        catch(e){
            res.send({
                apiStatus:false,
                data:e.message,
                message:"error loading users data"
            })
        }
    
    }
    static delAll = async(req,res)=>{
        try{
            await userModel.deleteMany()
            res.send({
                apiStatus: true,
                message:"deleted",
                data:user
            })
        }
        catch(e){
            res.send({
                apiStatus:false,
                data:e.message,
                message:"error on delete"
            })
        }
    
    }
    static delSingle = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndDelete(req.params.id)
            if(!user) throw new Error("user not found")
            res.send({
                apiStatus: true,
                message:"deleted",
                data:user
            })
        }
        catch(e){
            res.send({
                apiStatus:false,
                data:e.message,
                message:"error on delete"
            })
        }
    }
    static addAddres = async(req,res)=>{
        try{
            const user = await userModel.findOne({_id:req.params.id})
            if(!user) throw new Error("user not found")
            user.addresses.push(req.body)
            await user.save()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"address added successful"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"error adding address"
            })
        }
    }
}
module.exports = User