const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pagesController");

router.get("/list_pages", pageController.getListPages);
router.route("/add_page").post(pageController.postAPage);

module.exports = router;
