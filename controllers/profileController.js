const { User, UserProfile } = require("../models");

class ProfileController {
  static async userProfile(req, res) {
    try {
      const userId = req.session.userId;
      // res.send(userId);

      const { notification, error } = req.query;

      const userProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      console.log(req.session);
      // return res.send(userProfile)
     

      if (!userProfile) {
        const msg = `Please setup profile first`
        return res.redirect(`/profile/set?notification=${msg}`);
      } else{
        req.session.profile = 'pass'
      }
      // console.log(userProfile);
      // console.log(userProfile);
      // console.log(userProfile);
      // console.log(userProfile);

      res.render("profile", { notification, userProfile , error});
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async homeButton(req, res) {
    try {
      if (req.session.userRole === "clientA") {
        return res.redirect("/service");
      }
      if (req.session.userRole === "clientB") {
        return res.redirect("/slots");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async setProfileForm(req, res) {
    try {
      const { error , notification} = req.query;

      res.render("setProfileForm", { error, notification });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleSetProfile(req, res) {
    try {
      const userId = req.session.userId;
      const { displayName, bio, phoneNumber, photoUrl } = req.body;

      await UserProfile.create({
        displayName,
        bio,
        phoneNumber,
        photoUrl,
        UserId: userId,
      });
      const msg = "You succesfully created profile";
      res.redirect(`/profile?notification=${msg}`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const err = error.errors.map((el) => {
          if (el.message === "phoneNumber must be unique") {
            return "Phone Number has been taken";
          }else {
            return el.message;
          }
        });
        res.redirect(`/profile/set?error=${err}`);
      } else if (error.name === "SequelizeValidationError") {
        const err = error.errors.map((el) => el.message);
        res.redirect(`/profile/set?error=${err}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async editProfileForm(req, res) {
    try {
      const userId = req.session.userId;
      const { error } = req.query;
      const userProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      res.render(`editProfileForm`, { error, userProfile });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updateProfileData(req, res) {
    try {
      const userId = req.session.userId;
      const { displayName, bio, phoneNumber, photoUrl } = req.body;

      await UserProfile.update(
        { displayName, bio, phoneNumber, photoUrl, UserId: userId },
        { where: { UserId: userId } }
      );

      const msg = "You succesfully created profile";
      res.redirect(`/profile?notification=${msg}`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const err = error.errors.map((el) => {
          if (el.message === "phoneNumber must be unique") {
            return "Phone Number has been taken";
          }else {
            return el.message;
          }
        });
        res.redirect(`/profile/edit?error=${err}`);
      } else if (error.name === "SequelizeValidationError") {
        const err = error.errors.map((el) => el.message);
        res.redirect(`/profile/edit?error=${err}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
}
module.exports = ProfileController;
