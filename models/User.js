const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt"),
  uniqueValidator = require("mongoose-unique-validator"),
  UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  });

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
