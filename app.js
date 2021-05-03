// Import express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// parse application/json
app.use(bodyParser.json());

// array to hold users

// Initial Route
app.get("/", function (req, res) {
  res.send("App works!!");
});

// Send user data
app.use("/api/v1", require("./api/v1/"));

// export the app
module.exports = app;
