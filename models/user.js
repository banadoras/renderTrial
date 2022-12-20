const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(v)=>{
                return validator.isStrongPassword(v,{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })
            },
            message:(props)=>{
                console.log(props.value)
                `Password is not strong enough!`
            }
        }
    },
})

userSchema.pre("save",async function(next){
    try {
        this.password = await bcrypt.hash(this.password,10)
    } catch (error) {
        console.log(error.message)
    }
    next()
})

const User = mongoose.model("User",userSchema)

module.exports = User