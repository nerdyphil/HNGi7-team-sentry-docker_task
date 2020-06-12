const router = require("express").Router(),
            User = require("../models/users"),
            mongoose = require("mongoose")

router.get("/configure", (req, res)=>{
    if(mongoose.connection.readyState == 1){
        const id = req.query.id
        User.findOne({ account_id: id }, (err, user)=>{
            if(err || user == null){
                res.status(404).json({
                    status: "User Not Found",
                    message: "Invalid Account ID"
                })
            }else{
                res.status(200).json({
                    status: "success",
                    settings: user.settings
                })
            }
        })
    }else{
     res.status(500).json({
        status: "fail",
        message: "Error establishing a database connection"
     })
    }
})

router.post("/configure", (req, res) =>{
    if(mongoose.connection.readyState == 1){
        const id = req.query.id,
          add_page_setting = req.body.add_page_setting,
          set_page_setting = req.body.set_page_setting,
          retrieve_page_setting = req.body.set_page_setting;


        User.findOne({ account_id: id },(err, user) =>{
            if(!err & user != null){

            }
        })
    }
})

module.exports = router;