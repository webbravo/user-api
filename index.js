// import environmental variables from our variables.env file
require("dotenv").config();

// Database connection
require("./models/connections");

const app = require("./app");

//  Config our application log
const logger = require("log4js").getLogger();
logger.level = "debug";

// request to handle undefined or all other routes
app.use((req, res, next) => {
  logger.error("No routes found");
  res.status(404).send({
    status: 404,
    error: "No Route Matched!",
  });
});

app.set("port", process.env.PORT || 3070);
const server = app.listen(app.get("port"), () => {
  logger.debug(
    `Connected & Express is Serving on → PORT http://127.0.0.1:${
      server.address().port
    }`
  );
});
