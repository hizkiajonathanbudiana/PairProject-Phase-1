const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController.js");

router.get("/", UserController.home);
router.get("/register", UserController.register);
router.post("/register", UserController.createUser);
router.get("/login", UserController.login);
router.post("/login", UserController.handleLogin);

router.use(function (req, res, next) {
  if (!req.session.userId) {
    const error = "PLease login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.get("/profile", UserController.profile);

module.exports = router;
