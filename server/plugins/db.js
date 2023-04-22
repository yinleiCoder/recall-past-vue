module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://127.0.0.1:27017/recall-past", {
      useNewUrlParser: true,
    })
    .catch((err) => console.log(err));
  require("require-all")(__dirname + "/../models");
};
