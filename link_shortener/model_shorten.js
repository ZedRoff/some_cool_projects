const mongoose = require("mongoose")


const proc = new mongoose.Schema({
    name: String,
    url: String
})

module.exports = mongoose.model("Shorten", proc)