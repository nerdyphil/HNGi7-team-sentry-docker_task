const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
