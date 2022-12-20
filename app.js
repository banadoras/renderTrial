require("dotenv").config()

//-------- required packages/files
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
const MongoStore = require("connect-mongo")
const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"public/uploads"))
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({storage:storage})
const { authenticate, login } = require("./auth")

//----- app set and use
//app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
const dburl = `mongodb+srv://banadoras:${process.env.DB_PASSWORD}@cluster0.bocrh.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
app.use(session({
    secret:process.env.D_PASSWORD,
    saveUninitialized:false,
    resave:false,
    cookie:{},
    store:MongoStore.create({mongoUrl:dburl})
}))
app.use(flash())

//------ connect to Database
require("./databases/db")

//------ connecting routers
app.use("/users",require("./routers/user"))
app.use("/items",require("./routers/item"))




app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})


//----------POST requests

app.post("/login", async (req, res) => {
    try {
        const user = await login(req.body)
        if (user) {
            req.session.user = user
            res.redirect("/protected")
        }
    } catch (error) {
        req.flash("errorMessage",error.message)
        res.redirect("/login")
    }
})


//---------- Server listening
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})

