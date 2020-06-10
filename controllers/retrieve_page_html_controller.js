const router = require("express").Router(),
            request = require("request"),
            Data = require("../config/database/database"),
            Config = require("../config/config")


router.get("/retrieve_page_html", (req, res) => {
    //REQUIRED
    // url
    //type
    const url = req.query.url;
    const type = req.query.type

    //for external links
    if (type == "external") {
        request(url, (error, response, body) => {
            if (error)
                res.send("Something went wrong!!! : " + error)
            res.send("<plaintext>" + response.body + "</plaintext>")
        })
    } else if (type == "internal") {
        //send a request to /list_pages and get list of pages
        request("http://my-docker-task:" + process.env.PORT + "/list_pages", (error, response, body) => {
            if (error)
                res.send(error)
            //Then convert to markdown and send to client
            res.send("<plaintext>" + body + "</plaintext>");
        })
    }
})

//for handling internal request after user selects page
router.post("/retrieve_page_html:page_id", (req, res) => {
    const page_id = req.params.page_id;
    Data.findById(page_id, (err, page) => {
        if (err)
            res.send("Sorry! That page could not be found: " + err);
        res.send("plaintext" + page.body + "</plaintext>");
    })
})

module.exports = router;