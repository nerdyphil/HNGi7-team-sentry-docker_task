const mongoose = require("mongoose");

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
