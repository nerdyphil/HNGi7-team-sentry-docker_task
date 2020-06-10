/**
 * @file
 * add_page
 * 
 * Adds the webpage HTML markup to the database to be retrieved when 
 * called on.
 */

/**
 * Holds the settings to make this controller fully functional
 * 
 * @namespace
 */

const router = require("express").Router(),
            Data = require("../Resources/database/database"),
            mongoose = require("mongoose"),
            Config = require("../config/config");


/**
 * Support parsing of the application/x-www-form-urlencoded post data
 * 
 * @constructor 
 */

router.use(require("body-parser").urlencoded({extended:true}))

/**
 * Checks the url and adds the page specified the url to the database
 * through a post request
 * 
 * @constructor
 */

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
   res.status(503).json({
       status: "No database connection established"
   })
})

module.exports = router