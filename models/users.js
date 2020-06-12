const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    key: { 
        type: String, 
        required: true, 
        unique: true 
    },
    settings: {
        set_page_markdown:{
            dataFormat: {
                type: String,
                default: "JSON"
            }
        },
        list_pages:{
            dataFormat: {
                type: String,
                default: "JSON"
            }
        }
    }
});

module.exports = mongoose.model("user", userSchema);