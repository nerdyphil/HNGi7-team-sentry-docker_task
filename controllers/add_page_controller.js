const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");

router.use(require("body-parser").urlencoded({extended:true}))

router.post("/add_page", require("../config/Auth/authenticate"), (req, res) => {
   if(mongoose.connection.readyState == 1){
       const title = req.body.title,
           content = req.body.content;
           if(title && content != "" || undefined){
               data = new Data({
                   title: title,
                   content: content
               })
               data.save((err, success) => {
                   if (err){
                       res.status(500).json({
                           status: "fail",
                           message: "Something went wrong, it's not you, it's us."
                       });
                   }else{
                        res.status(200).json({ 
                            status: "successfully added new page",
                            page: success
                        });
                   }
               })
           }else{
               res.status(503).json({
                   statua: "fail",
                   message:"title or body cannot be empty"
               })
           }
   }
   else{
       res.status(500).json({
           status: "Error establishing database connection"
       })
   }
})

module.exports = router