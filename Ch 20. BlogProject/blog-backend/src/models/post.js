const mongoose = require("mongoose");

const { Schema } = mongoose;

// Schema
const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: new Date()
  }
});

// Schema로 model 만들기.
module.exports = mongoose.model("Post", Post);
