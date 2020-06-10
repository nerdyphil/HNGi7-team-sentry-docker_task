const router = require("express").Router(),
            Data = require("../Resources/database/database"),
            mongoose = require("mongoose"),
            Config = require("../config/config");

// request = require("request"),
// mongoose = require("mongoose");
router.get("/list_pages", (req, res) => {
    if(mongoose.connection.readState == 1){
        // const url = req.body.url;
        Data.find({}, (err, pages) => {
            if (err)
                res.send(err);
            res.json(pages)
        })
    }
    res.status(503).json({
        status: "failed",
        message: "No database connection established"
    })
})

module.exports = router;