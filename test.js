"use strict";

const mongoose = require("mongoose"),
  BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost:27017/lim", { useNewUrlParser: true });

BlogPost.create(
  {
    title: "The Mythbuster's Guide to Saving Money on Energy Bills",
    body: "Global problem needs global answer",
  },
  (error, blogpost) => {
    console.log(error, blogpost);
  }
);

BlogPost.find({}, (err, blogpost) => {
  console.log("Result:", blogpost);
});
