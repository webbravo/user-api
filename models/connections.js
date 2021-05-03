const mongoose = require("mongoose");
const logger = require("log4js").getLogger();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", function () {
  logger.info("Mongoose default connection open");
});

mongoose.connection.on("error", function (err) {
  logger.error("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  logger.debug("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.debug(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
