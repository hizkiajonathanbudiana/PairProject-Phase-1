const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const UserController = require("../controllers/userController.js");
const ProfileController = require("../controllers/profileController.js");
const ServiceController = require("../controllers/serviceController.js");
const SlotsController = require("../controllers/slotsController.js");

const { protector, roleA, roleB, profile } = require("../middlewares");

const limiter = rateLimit({
  windowMs: 10 * 1000, 
  // 1  * 60 * 1000
  limit: 5, 
  standardHeaders: "draft-8", 
  legacyHeaders: false, 
  message: "Too many requests, please try again later after 10 seconds",
});

// router.use(limiter);

router.get("/", UserController.home);
router.get("/register", UserController.register);
router.post("/register", UserController.createUser);
router.get("/login", limiter,  UserController.login);
router.post("/login", limiter, UserController.handleLogin);
router.get("/logout", UserController.logout);

router.use(protector);

router.get("/profile", ProfileController.userProfile);
router.get("/profile/set", ProfileController.setProfileForm);
router.post("/profile/set", ProfileController.handleSetProfile);

router.use(profile)

router.get("/home", ProfileController.homeButton);
router.get("/profile/edit", ProfileController.editProfileForm);
router.post("/profile/edit", ProfileController.updateProfileData);

//service//slots table
router.get("/service", roleA, ServiceController.showServiceUser);
router.get("/service/addSlot", roleA, ServiceController.addSlotService);
router.post("/service/addSlot", roleA, ServiceController.saveSlotService);
router.get(
  "/service/delete/:idService",
  roleA,
  ServiceController.deleteService
);

//serviceslots//slots table
router.get("/slots", roleB, SlotsController.slot);
router.get("/slots/book/:idSlot", roleB, SlotsController.book);

module.exports = router;
