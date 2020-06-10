const router = require("express").Router(),
            Data = require("../Resources/database/database"),
            Config = require("../config/config")

router.use(require("body-parser").urlencoded({extended:true}))

router.post("/add_page", (req, res) => {
   if(mongoose.connection.readState == 1){
       const title = req.body.title,
           content = req.body.content;
       console.log(title, content)
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
})

module.exports = router