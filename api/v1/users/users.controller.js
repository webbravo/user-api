// Import database
const User = require("../../../models/Users");
const { validationResult } = require("express-validator");

const {
  createToken,
  hashPassword,
  verifyPassword,
} = require("../../../token/tokens");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 0. Check if Email and password was entered
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // 1. Find user in array. If not exist send error
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.json({ result: "error", message: "User not found" }).status(401);
  }

  // 2. Compare encrypted password and see if it checks out. Send error if not
  const passwordValid = await verifyPassword(password, foundUser.password);
  if (passwordValid) {
    const userInfo = {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      occupation: foundUser.occupation,
    };

    // Create a token
    const token = createToken(userInfo);

    res
      .json({
        status: "success",
        message: "Authentication successful!",
        token,
      })
      .status(200);
  } else {
    // Invalid password
    res.json({ status: "error", message: "Invalid password" }).status(401);
  }
};

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

exports.all = async (req, res) => {
  // 1. Get all user
  const users = await User.find({});

  // 2. Format response
  const data = users.map((user) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      occupation: user.occupation,
    };
  });

  // 3. Send response
  return res
    .json({
      message: "List of all user",
      status: "success",
      data,
    })
    .status(201);
};
