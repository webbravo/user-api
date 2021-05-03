/**
 * This is a custom server side validation file
 * Created by michio @PoweredPeople hub
 * Date: 19th Dec 2018
 */

const { body, sanitizeParam } = require("express-validator");

module.exports = {
  register: [
    body("firstName")
      .trim()
      .escape()
      .isLength({
        min: 4,
      })
      .withMessage("First name is too short"),

    body("lastName")
      .trim()
      .escape()
      .isLength({
        min: 4,
      })
      .withMessage("Last name is too short"),

    body("email")
      .trim()
      .escape()
      .isLength({
        max: 120,
      })
      .withMessage("Email is too long!")
      .isEmail({
        domain_specific_validation: true,
      })
      .withMessage("Enter a valid email address"),

    body("occupation")
      .trim()
      .escape()
      .isLength({
        min: 4,
      })
      .withMessage("occupation is too short"),

    body("password")
      .isLength({
        min: 6,
      })
      .withMessage("Password too short")
      .matches("[0-9]")
      .withMessage("Password must contain at least 1 number.")
      .matches("[a-z]")
      .withMessage("Password must contain at least 1 lowercase letter.")
      .custom((value, { req }) => {
        if (value !== req.body.conPassword) {
          return false;
        } else {
          return true;
        }
      })
      .withMessage("Password don't Match"),
  ],

  login: [
    body("email")
      .trim()
      .escape()
      .isLength({
        max: 120,
      })
      .withMessage("Email is too long!")
      .isEmail({
        domain_specific_validation: true,
      })
      .withMessage("Enter a valid email address"),
  ],

  sanitizeURLParams: [sanitizeParam("id").escape().trim().toInt()],
};
