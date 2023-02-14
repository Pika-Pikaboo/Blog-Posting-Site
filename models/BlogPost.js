const mongoose = require("mongoose"),
  { Schema } = mongoose,
  BlogPostSchema = new Schema({
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "Please provide article body"],
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: {
      type: String,
    },
    datePosted: {
      type: Date,
      default: new Date(),
    },
    image: String,
  });

module.exports = mongoose.model("BlogPost", BlogPostSchema);
