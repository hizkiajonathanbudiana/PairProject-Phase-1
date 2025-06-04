const { User, UserProfile } = require("../models");

class ProfileController {
  static async checkProfile(req, res) {
    try {
      const userId = req.session.usedId;
      const { notification } = req.query;

      const checkProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      if (!checkProfile) {
        res.redirect(`/profile/set/${userId}`);
      }

      res.render("profile", { notification });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async backButton(req, res) {
    try {
      if (req.session.role === "roleA") {
        res.redirect("/roleA");
      }
      if (req.session.role === "roleB") {
        res.redirect("/roleB");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async setProfileForm(req, res) {
    try {
      const { userId } = req.params;
      const { error } = req.query;

      res.render(`setProfileForm`, { error, userId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleSetProfile(req, res) {
    try {
      const { userId } = req.params;
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
      if (error.name === "SequelizeValidationError") {
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
      const { userId } = req.params;
      const { error } = req.query;

      res.render(`editProfileForm`, { error, userId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updateProfileData(req, res) {
    try {
      const { userId } = req.params;
      const { displayName, bio, phoneNumber, photoUrl } = req.body;

      await UserProfile.update(
        { displayName, bio, phoneNumber, photoUrl, UserId: userId },
        { where: { UserId: userId } }
      );

      const msg = "You succesfully created profile";
      res.redirect(`/profile?notification=${msg}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
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
