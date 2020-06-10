const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config")

router.use(require("body-parser").urlencoded({extended:true}))

router.post("/add_page", (req, res) => {
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
        res.send(200).json( { status :  "success" });
    })
})

module.exports = router