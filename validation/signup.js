const Validator = require("validator");
const isEmpty = require("is-empty");

exports.validateRegisterInput = (data) => {
  // Create An Error Object
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";

  // Name checks
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "Name field is required";
  } else if (!Validator.isAlphanumeric(data.fullname)) {
    errors.fullname = "Only letters, numbers allowed for name field";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Username  checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = "Username too short";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password field is required";
  }

  // Check lenght of password
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // TODO: Check if password if alphaNumeric

  // Check if password matches
  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords must match";
  }

  // Return Error Object
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
