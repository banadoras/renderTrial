const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
const dburl = `mongodb+srv://banadoras:${process.env.DB_PASSWORD}@cluster0.bocrh.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
mongoose.connect(dburl,(error)=>{
    if(error){
        console.log(error.message)
    }else{
        console.log("Connected to Database")
    }
})