const router = require("express").Router();
            Data = require("../config/database/database"),
            Config = require("../config/config")

// request = require("request"),
// mongoose = require("mongoose");
router.get("/list_pages", (req, res) => {
    console.log("request received")
    // const url = req.body.url;
    Data.find({}, (err, pages) => {
        if (err)
            res.send(err);
        res.send(pages)
    })
})

module.exports = router;