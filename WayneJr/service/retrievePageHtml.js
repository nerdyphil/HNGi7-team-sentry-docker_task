// Using request promise to retrieve the html of the page
const rPromise = require('request-promise');
const url = require('url');

// Still thinking of how to abstract this so that
// any website added to the url will be parsed automatically parsed
// const url = "https://www.wikipedia.com";

var retrievePageHtml = {
    // Get the page html data as an object
    getPageHtml: (req, res, next) => {
        let serverPageUrl = url.parse(req.url, true);
        let retrieveQuery = serverPageUrl.search;
        let pageUrl = "https://"+ retrieveQuery.substring(1, );
        console.log(pageUrl);
        rPromise(pageUrl,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Return or send that the response object so that
            // it is visible by the server
            res.send({
                "request-type": response.request["method"],
                "status": response.statusCode,
                "data": response.body,
                "content-type": response.headers["content-type"],
                "website-url": pageUrl
            })
            
        } else {
            // What to return if the webpage is not found
            console.log(response.statusCode + response.body);
            res.send({"status": response.statusCode, "message": response});
        }
    });

    }
};

module.exports = retrievePageHtml;