// Import database
const User = require("../../../models/Users");
const { validationResult } = require("express-validator");

const {
  createToken,
  hashPassword,
  verifyPassword,
} = require("../../../token/tokens");

exports.register = async (req, res) => {
  //  Check if error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { firstName, lastName, email, occupation, password } = req.body;

    // 1. Hash password
    const hashedPassword = await hashPassword(password);

    // 2. Check if user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .json({ status: "error", message: "User already exists" })
        .status(401);
    } else {
      // Saving new user to database
      const newUser = {
        firstName,
        lastName,
        email,
        occupation,
        password: hashedPassword,
      };

      //  Create a new user
      const savedUser = await User.create(newUser);

      // Send information to the browser
      if (savedUser) {
        return res
          .json({
            status: "success",
            message: `Account created successfully`,
          })
          .status(201);
      } else {
        return res
          .json({
            status: "error",
            message: "user not created!",
          })
          .status(401);
      }
    }
  } catch (err) {
    res.status(401).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res, next) => {
  res.send("Route is working");
};

exports.all = async (req, res, next) => {
  const users = [
    {
      firstName: "A",
      sureName: "B",
      email: "example@gmail.com",
      occupation: "my job",
    },
    {
      firstName: "c",
      sureName: "f",
      email: "example2@gmail.com",
      occupation: "my job",
    },
  ];

  res
    .json({
      message: "List of all users",
      status: "success",
      data: [users],
    })
    .status(200);
};

const checkForUsers = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return !user ? false : true;
  } catch (error) {
    console.error(error);
  }
};
