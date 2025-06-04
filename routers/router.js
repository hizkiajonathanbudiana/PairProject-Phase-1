const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit')

const UserController = require("../controllers/userController.js");


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


router.get("/", UserController.home);
router.get("/register", UserController.register);
router.post("/register", limiter, UserController.createUser);
router.get("/login", UserController.login);
router.post("/login", UserController.handleLogin);
router.get('/logout', UserController.logout)

router.use(function (req, res, next) {
  if (!req.session.userId) {
    console.log(req.session.user);
    
    const error = "PLease login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.get("/profile", UserController.profile);

module.exports = router;
