module.exports = (req, res, next) => {
  if (req.files === null || req.title === null || req.body === null) {
    return res.redirect("/posts/new");
  }
  next();
};
