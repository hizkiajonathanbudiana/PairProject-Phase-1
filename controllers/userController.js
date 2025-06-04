const { User , UserProfile } = require("../models");
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
      res.render("register");
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

      res.redirect("/register");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        const msg = "Can't find username";
        res.redirect(`/login?error=${msg}`);
      }

      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          req.session.userId = user.id;
          req.session.userRole = user.role;
          res.redirect("/profile");
        }
      } else {
        const msg = "Wrong Password";
        res.redirect(`/login?error=${msg}`);
      }
      
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }


  static async logout(req, res) {
    try {
      req.session.destroy((error)=>{
        if(error){
            res.send(error)
        }else{
            res.redirect('/login')
        }
      })
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = UserController;
