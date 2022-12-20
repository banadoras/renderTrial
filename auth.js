const User = require("./models/user")
const bcrypt = require("bcrypt")
const authenticate = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        req.flash("errorMessage","Please login or register")
        res.redirect("/login")
    }
}

const login = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username: username })  
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                return user
            } else {
                throw new Error("Invalid Credentials")
            }
        } else {
            throw new Error("Could not locate user")
        }
    } catch (error) {
        throw new Error(error.message)
    }  
}


module.exports = {authenticate,login}