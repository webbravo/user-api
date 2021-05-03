const express = require("express");
const controller = require("./users.controller");
const router = express.Router();
const validation = require("../../../middlewares/validations");
const { isAuth } = require("../../../middlewares/isAuth");

// Get all users
router.get("/allusers", isAuth, controller.all);

// Sign new users
router.post("/register", validation.register, controller.register);

// Login new users
router.post("/login", validation.login, controller.login);

// export routes
module.exports = router;
