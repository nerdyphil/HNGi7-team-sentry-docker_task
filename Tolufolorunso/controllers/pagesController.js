const Page = require("../model/pagesModel");

exports.postAPage = async (req, res, next) => {
  const { title, content } = req.body;
  if (title === "") {
    return next(new Error("Title is required"));
  }
  if (content === "") {
    return next(new Error("Url is required"));
  }
  try {
    const pageExist = await Page.find({ title });
    if (pageExist.length) {
      return next(new Error("Page is already"));
    }

    const page = await Page.create({
      title,
      content,
    });
    res.status(201).json({
      status: "success",
      data: {
        page,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getListPages = async (req, res, next) => {
  try {
    const pages = await Page.find().select("-__v");
    res.status(200).json({
      status: "success",
      data: {
        pages,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
