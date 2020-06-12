const User = require("../../models/users");

module.exports = Authenticate = (req, res, next) =>{
    User.findOne( { account_id: req.body.id }, (err, user) =>{
        if(!err){
            if (user.key === req.body.key){
                next();
            }else{
                res.status(403).json({
                    status: "Forbidden",
                    message: "Invalid Account ID or Key"
                })
            }
        }else{
            res.status(404).json({
                status: "Not Found",
                message: "The requested user account does not exist"
                /// I AM CURRENTLY WORKING HERE
            })
        }
    })
}