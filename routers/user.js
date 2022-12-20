const express = require("express")
const router = express.Router()

//------- import User model
const User = require("../models/user")

router.route("/")
    .get(async(req,res)=>{
        try {
            const users = await User.find({})
            if(users){
                res.send(users)
                //res.send(users) or res.render("users",{users:users})
            }else{
                res.send([])
                //res.send([])
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })
    .post(async (req,res)=>{
        try {
            const newUser = await User.create(req.body)
            if(newUser){
                //res.send(newUser) or res.render("somePage",{user:newUser})
                req.session.user = newUser
                state.user = newUser
                res.redirect("/protected")
            }else{
                req.flash(
                  "errorMessage",
                  "Something went wrong, not sure what, Could not create User"
                );
                res.redirect("/register");
            }  
        } catch (error) {
            console.log(error.message)
            req.flash("errorMessage", error.message)
            res.redirect("/register")
        } 
    })
    .delete(async(req,res)=>{
        try {
            const deleteAllUsers = await User.deleteMany({})
            if(deleteAllUsers){
                console.log(deleteAllUsers)
                //somekind of response
            }else{
                //somekind of response
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })

router.route("/:id")
    .get(async(req,res)=>{
        try {
            const user = await User.findById(req.params.id)
            if(user){
                //give some kind of response
            }else{
                //give some kind of response
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })
    .put(async (req,res)=>{
        try {
            const user = await User.findOneAndReplace({id:req.params.id},req.body,{returnDocument:"after"})
            if(user){
                //give some kind of response
            }else{
                //give some kind of response
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })
    .patch(async(req,res)=>{
        try {
            const user = await User.findByIdAndUpdate({id:req.params.id},req.body,{returnDocument:"after"})
            if(user){
                //give some kind of response
            }else{
                //give some kind of response
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })
    .delete(async(req,res)=>{
        try {
            const deletedUser = await User.findByIdAndDelete({id:req.params.id})
            if(deletedUser){
                console.log(deletedUser)
                //give some kind of response
            }else{
                //give some kind of response
            }  
        } catch (error) {
            console.log(error.message)
            //give some kind of response
        } 
    })


module.exports = router