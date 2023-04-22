const express = require("express");

const app = express();
app.set("secret", "yinleijwt");
const port = 3000;

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(require("cors")());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(myLogger);
app.use(requestTime);

require("./plugins/db")(app);
require("./routes")(app);

app.listen(port, () => {
  console.log(`Listening on: http://127.0.0.1:${port}/`);
});
