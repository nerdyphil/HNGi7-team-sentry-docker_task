const mongoose = require("mongoose");

//This connects to local mongodb
//In order to use online, get a mogodb url from mlab and replace here
const config = mongoose.connect("mongodb+srv://wayne:wayne@cluster0-l1oed.mongodb.net/webpages?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, success)=>{
    if(err){
        console.log("Could not connect to database")
    }else{
    console.log("Database Connection Successful")
}
});

module.exports = config;
