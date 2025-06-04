const { User, UserProfile } = require("../models");

class ProfileController {
  static async checkProfile(req, res) {
    try {
      const userId = req.session.usedId;
      const checkProfile = await UserProfile.findOne({
        where: { UserId: userId },
      });

      if (!checkProfile) {
        res.redirect(`/profile/set/${userId}`);
      }
      res.render("profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async setProfileForm(req, res) {
    try {
      // const {error} = req.query
      const { userId } = req.params;

      res.render(`setProfileForm`);
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

  static async editProfileForm(req, res) {
    try {
      const { userId } = req.params;

      res.render(`editProfileForm`);
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
  
}
module.exports = ProfileController;
