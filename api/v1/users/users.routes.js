const express = require("express");
const controller = require("./users.controller");
const router = express.Router();
const validation = require("../../../middlewares/validations");

// Get all users
router.get("/", controller.all);

// Sign new users
router.post("/register", validation.register, controller.register);

// Login new users
router.post("/login", controller.login);

// export routes
module.exports = router;
