const express = require("express");

const apiRouter = express();

apiRouter.use("/users", require("./users/users.routes"));

module.exports = apiRouter;
