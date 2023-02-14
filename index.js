"use strict";

require("dotenv").config();

const express = require("express"),
  app = express(),
  ejs = require("ejs"),
  fileUpload = require("express-fileupload"),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  port = process.env.PORT || 3000;

const validateMiddleware = require("./middlewares/validationMiddleware"),
  redirectIfAuthenticatedMiddleware = require("./middlewares/redirectIfAuthenticatedMiddleware"),
  authMiddleware = require("./middlewares/authMiddleware");

const newPostController = require("./controllers/newPost"),
  homeController = require("./controllers/home"),
  storePostController = require("./controllers/storePost"),
  getPostController = require("./controllers/getPost"),
  newUserController = require("./controllers/newUser"),
  loginController = require("./controllers/login"),
  loginUserController = require("./controllers/loginUser"),
  storeUserController = require("./controllers/storeUser"),
  logoutController = require("./controllers/logout");

const mongoose = require("mongoose");
const newPost = require("./controllers/newPost");
mongoose
  .connect(
    `mongodb+srv://Stevin_Valentine:${process.env.MONGODB_ATLAS_PASSCODE}@cluster0.fynmtlj.mongodb.net/test`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas successfully!"));

global.loggedIn = null;

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(
  expressSession({
    secret: "keyboard master",
  })
);
app.use(connectFlash());
app.use(fileUpload());
app.use("/posts/store", validateMiddleware);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(`${err.message}`);
});

app.get("/", homeController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.get("/posts/new", authMiddleware, newPostController);
app.get("/post/:id", getPostController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.post("/posts/store", authMiddleware, storePostController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.get("/auth/logout", logoutController);
app.use((req, res) => res.render("notfound"));

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
