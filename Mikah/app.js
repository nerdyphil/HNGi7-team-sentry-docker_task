const app = require("express")(),
            bodyParser = require("body-parser"),
            request = require("request"),
            mongoose = require("mongoose"),
            Data = require("./config/database/database"),
            Config = require("./config/config"),
            showdown = require("showdown")

const add_page_controller = require("./controllers/add_page_controller")
const list_pages_controller = require("./controllers/list_pages_controller")
const set_page_markdown_controller = require("./controllers/set_page_markdown_controller")
const retrieve_page_html_controller = require("./controllers/retrieve_page_html_controller")

app.use("/", add_page_controller)
app.use("/", list_pages_controller)
app.use("/", set_page_markdown_controller)
app.use("/", retrieve_page_html_controller)

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started >>> ")
})
