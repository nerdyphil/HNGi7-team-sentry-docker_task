/**
 * @file 
 * retrieve_page_html
 * 
 * Returns the html content of a specified webpage;
 * if the request is an internal request, it returns the HTML markup from
 * the database. if it is an external request it returns the HTML markup
 * from the url specified. 
 */

/**
 * Holds the settings to make this controller functional
 * 
 * @namespace
 */
const router = require("express").Router(),
            request = require("request"),
            Data = require("../Resources/database/database"),
            mongoose = require("mongoose");

/**
 * Makes a GET request to the database or the url specified
 * and retrieves the HTML markup from the page
 * 
 * @constructor
 * 
 * @param {URL} url
 * The request url that will parsed to carry out a GET (internal or external) request 
 * containing a link to the page to retrieve the markup whether (url or page_id)
 * 
 * @param {String} type
 * The type of GET request being made i.e internal or external
 * 
 * 
 */
router.get("/retrieve_page_html", (req, res) => {
    //REQUIRED
    // url
    //type
    const url = req.query.url;
    const type = req.query.type;

    //for external links
    if (type == "external") {
        request(url, (error, response, body) => {
            if (error)
                res.send("Something went wrong!!! : " + error);
            res.status(200).json({
                status: "success",
                data: response.body
            })
        })
    } else if (type == "internal") {
        //send a request to /list_pages and get list of pages
        request("http://localhost:3000/api/list_pages", (error, response, body) => {
            if (error)
                res.send(error)
            //Then convert to markdown and send to client
            res.json({body});
        }
    )}
});
//for handling internal request after user selects page

/**
 * Retrieves the markup from an internal request made to a 
 * page stored in the database
 * 
 * @param {Number} page_id
 * Takes the page id as part of the url and makes a POST request to the
 * database to return that page's markup 
 * 
 */

router.post("/retrieve_page_html:page_id", (req, res) => {
    if(mongoose.connection.readyState == 1){
        const page_id = req.params.page_id;
        Data.findById(page_id, (err, page) => {
            if (err)
                res.send("Sorry! That page could not be found: " + err);
            res.status(200).json({
                page
            });
        })
    }
    res.status(503).json({status: "No database connection established" });
});

module.exports = router;