const { User, UserProfile } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async home(req, res) {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      const { error } = req.query;
      res.render("register", { error });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, role } = req.body;
      console.log(username, email, password, role);

      await User.create({ username, email, password, role });

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const err = error.errors.map((el) => {
          if (el.message === "username must be unique") {
            return "Username has been taken";
          } else if (el.message === "email must be unique"){
            return "Email has been taken"
          }else {
            return el.message;
          }
        });
        res.redirect(`/register?error=${err}`);
      } else if (error.name === "SequelizeValidationError") {
        const err = error.errors.map((el) => el.message);
        res.redirect(`/register?error=${err}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async login(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        const msg = "Please fill Username and Password";
        return res.redirect(`/login?error=${msg}`);
      }

      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        const msg = "Can't find username";
        return res.redirect(`/login?error=${msg}`);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        req.session.userId = user.id;
        req.session.userRole = user.role;

        console.log(JSON.parse(JSON.stringify(req.session)));

        const msg = 'Succesfully login'
        return res.redirect(`profile?notification=${msg}`);
      } else {
        const msg = "Wrong Password";
        return res.redirect(`/login?error=${msg}`);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const err = error.errors.map((el) => el.message);
        res.redirect(`/login?error=${err}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }

  static async logout(req, res) {
    try {
      req.session.destroy((error) => {
        if (error) {
          res.send(error);
        } else {
          res.redirect("/login");
        }
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = UserController;
