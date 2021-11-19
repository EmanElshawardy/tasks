const taskModel = require('../../db/models/task.model')
class Task{
    static addTask = async(req, res)=>{
        try{
            const newTask = new taskModel(req.body)
            await newTask.save()
            res.status(200).send({
                apiStatus: true,
                data:newTask,
                message:"task added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data: e.message,
                message:"error adding task"
            })
        }
    }
    static getAllTasks = async(req, res)=>{
        try{
            let myData = await Data.find()
            res.status(200).send({
                apiStatus:true,
                data:myData,
                message:"Data fetched success"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message:"Problem while loading"
            })
        }
    }
    static getSingle = async(req,res)=>{
        const id = req.params.id
        try{
            result = await Data.findById(id)
            if(!result) res.send('not found')
            res.send(result)
        }
        catch(e){
            res.send(e)
        }
    }
    
    
    static deleteTask = async(req,res)=>{
        try{
            id = req.params.id
            const data = await Data.findByIdAndDelete(id)
            if(!data) return res.status(400).send({
                apiStatus:false,
                data:null,
                message:"Data not found"
            })
            res.status(200).send({
                apiStatus:true,
                data:data,
                message: "deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message: "error in delete"
            })
        }
    }
    
    static editTask = async(req,res)=>{
        try{
            id = req.params.id
            allowed = ['date']
            requested = Object.keys(req.body)
            console.log(requested)
    
            const isValidUpdates = requested.every(r=> allowed.includes(r))
    
            if(!isValidUpdates) return res.status(500).send({
                apiStatus:false,
                data:null,
                message:"invalid requested"
            })
            
            const task = await Data.findByIdAndUpdate(id, req.body,{new:true, runValidators:true})
            if(!task) return res.status(404).send({
                apiStatus:false,
                 data:null,
                  message:"task not found"
                })
            res.status(200).send({
                apiStatus:true,
                data:task,
                message:"updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                data:e.message,
                message: "error in edit"
            })
        }
    
    }

}
module.exports = Task