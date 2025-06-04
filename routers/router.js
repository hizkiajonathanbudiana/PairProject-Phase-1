const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const UserController = require("../controllers/userController.js");
const ProfileController = require("../controllers/profileController.js");

const { protector, roleA, roleB, profile } = require("../middlewares");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

router.get("/", UserController.home);
router.get("/register", UserController.register);
router.post("/register", limiter, UserController.createUser);
router.get("/login", UserController.login);
router.post("/login", limiter, UserController.handleLogin);
router.get("/logout", UserController.logout);

router.use(protector);

router.get("/profile", ProfileController.userProfile);
router.get("/profile/set", ProfileController.setProfileForm);
router.post("/profile/set", ProfileController.handleSetProfile);
router.get("/profile/edit", ProfileController.editProfileForm);
router.post("/profile/edit", ProfileController.updateProfileData);



module.exports = router;
