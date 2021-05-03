const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },

  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  occupation: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

UserSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model("users", UserSchema);

module.exports = User;
