const router = require("express").Router(),
            Data = require("../Resources/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");

router.use(require("body-parser").urlencoded({extended:true}))

router.post("/add_page", (req, res) => {
   if(mongoose.connection.readyState == 1){
       const title = req.body.title,
           content = req.body.content;
<<<<<<< HEAD
           if(title && content != "" || undefined){
               data = new Data({
                   title: title,
                   content: content
               })
               data.save((err, success) => {
                   if (err)
                       res.send("Something went wrong!!! : " + error);
                   res.send(200).json({ status: "success" });
               })
           }else{
               res.status(503).json({
                   statua: "fail",
                   message:"title or body cannot be empty"
               })
           }
   }
   else{
       res.status(503).json({
           status: "No database connection established"
       })
   }
=======
       data = new Data({
           title: title,
           content: content
       })
       data.save((err, success) => {
           if (err)
               res.send("Something went wrong!!! : " + error);
           res.send(200).json({ status: "success" });
       })
   }
   else{
       res.status(503).json({
           status: "No database connection established"
       })
   }
>>>>>>> 27a5a65e90733b4419a2a97e2205b5f46a906582
})

module.exports = router