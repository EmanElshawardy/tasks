const { MongoClient , ObjectId } = require('mongodb')

const myConnection = (callback) =>{
    MongoClient.connect('mongodb://localhost:27017', { }, (error, client)=>{
        if(error) return callback(error, false)
        const db = client.db('Bank')
        callback(false, db)
    })
}

module.exports = myConnection