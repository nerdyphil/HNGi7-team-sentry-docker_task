const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config")

router.use(require("body-parser").urlencoded({extended:true}))

router.get("/add_page", (req, res) => {
    const title = req.body.title,
        content = req.body.content;
    data = new Data({
        title: title,
        content: content
    })
    data.save((err, success) => {
        if (err)
            res.send("Something went wrong!!! : " + error);
        res.send("Data saved successfully : " + success);
    })
})

module.exports = router