const mongoose = require("mongoose")
const itemSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    info: {
        type: String,
        required:true
    }
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item