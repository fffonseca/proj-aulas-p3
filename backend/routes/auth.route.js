const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
//falta o refreshtoken
//falta o logout

module.exports = router;
