const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  // Sign the JWT
  if (!user.occupation) {
    throw new Error("No user occupation");
  }
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      occupation: user.occupation,
      aud: "api.10dPredict",
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "There was a problem authorizing the request",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "Insufficient role",
    });
  }
  next();
};

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
  requireAdmin,
};
