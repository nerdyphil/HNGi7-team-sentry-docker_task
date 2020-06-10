const express = require("express");
const mongoose = require("mongoose");

const pagesRouter = require("./routes/pagesRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(pagesRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

mongoose
  .connect("mongodb://localhost:27017/HNG-microservice", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((c) => console.log("DATABASE connection successfull"));

const globalError = (error, req, res, next) => {
  if (error) {
    res.status(422).json({
      status: "fail",
      error: error.message,
    });
  }
};
app.use(globalError);
app.listen(3000);
