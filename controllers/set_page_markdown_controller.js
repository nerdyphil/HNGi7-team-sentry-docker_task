const router = require("express").Router(),
            showdown = require("showdown"),
            request = require("request"),
            turndown = require("turndown"),
            Data = require("../config/database/database"),
            Config = require("../config/config")


const converter = new turndown();
const showDown = new showdown.Converter();
//first get the requested page 
router.get("/set_page_markdown", (req, res) => {
    //url for requests on external links
    const page = req.query.type;
    if (page == "external") {
        const url = req.query.url
        request(url, (error, response, body) => {
            if (error)
                res.send("Something went wrong!!!" + error);
            // convert HTML to Markdown
            const markdown = converter.turndown(body);
            res.send(markdown);
        })
    } else if (page == "internal") {
            console.log("received >>>")
        request("http://localhost:3000/api/list_pages", (error, response, body) => {
            if (error)
                res.send(error)
            //Send back list of pages for user to pick and set markdown 
            res.json(JSON.parse(body))
        })
    }
})

//for finding the required page by _id and sending back to user
router.post("/set_page_markdown:page_id", (req, res) => {
    const page_id = req.params.page_id;
    Data.findById(page_id, (err, page) => {
        if (err)
            res.send("Sorry! That page could not be found: " + err);
        //Then convert to markdown and send to client
        const markdown = converter.turndown(page);
        res.send(markdown);
    })
})


router.post("/set_page_markdown", (req, res) => {
    console.log("received")
    //Get markdown from client, convert 
    const title = req.body.title;
    const markdown = req.body.markdown;
    console.log(title, markdown)
    //convert to html and save in database
    const htmlTitle = showDown.makeHtml(title),
                html = showDown.makeHtml(markdown);
    console.log(html, htmlTitle)

    const htmlData = new Data({
        title: htmlTitle,
        content: html
    })

    Data.create(htmlData, (err, success) => {
        if (err)
            res.send(err);
        res.send("<h2>Markdown saved successfully</h2>" + "<br>" + success)
    });
})

module.exports = router;