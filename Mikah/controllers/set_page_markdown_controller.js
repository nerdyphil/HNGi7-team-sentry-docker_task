const router = require("express").Router(),
            showdown = require("showdown"),
            Data = require("../config/database/database"),
            Config = require("../config/config")


            const converter = new showdown.Converter();
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
                        const markdown = converter.makeMarkdown(body);
                        res.send(markdown);
                    })
                } else if (page == "internal") {
                    request("http://my-docker-task:" + process.env.PORT + "/list_pages", (error, response, body) => {
                        if (error)
                            res.send(error)
                        //Then convert to markdown and send to client
                        const markdown = converter.makeMarkdown(body)
                        res.send(body)
                    })
                }
            })

            router.post("/set_page_markdown", (req, res) => {
                //Get markdown from client, convert 
                const title = req.body.title;
                const markdown = req.body.markdown;
                //convert to html and save in database
                const htmlTitle = converter.makeHtml(title),
                    html = converter.makeHtml(markdown);

                const htmlData = new Data({
                    title: htmlTitle,
                    content: html
                })
                Data.create(htmlData, (err, success) => {
                    if (err)
                        console.log(err);
                    res.send("<h2>Markdown saved successfully</h2>" + "<br>" + success)
                });
            })

            module.exports = router;