const mongoose = require("mongoose");

//This connects to local mongodb
//In order to use online, get a mogodb url from mlab and replace here
const config = mongoose.connect("mongodb://localhost/docker_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, success)=>{
    if(err){
        console.log("Could not connect to database")
    }else{
    console.log("connected database")
}
});

module.exports = config;
