const mongoose = require("mongoose");
//create database skeleton
const dataSchema = new mongoose.Schema({
    title: String,
    content: String,
    created: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model("data", dataSchema);
