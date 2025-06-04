const rateLimit = require('express-rate-limit')


const protector = (function (req, res, next) {
  if (!req.session.userId) {
    console.log(req.session.userId);
    
    const error = "PLease login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});



const roleA = function (req, res, next) {
  if (!req.session.userId === 'roleB') {
    console.log(req.session.userId);
    
    const error = "Can't view this page!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
}


const roleB = function (req, res, next) {
  if (!req.session.userId === 'roleA') {
    console.log(req.session.userId);
    
    const error = "Can't view this page!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
}


const profile = function (req, res, next) {
  if (!req.session.profile) {
    console.log(req.session.userId);
    
    const error = "Please set profile first";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
}


module.exports = {protector, roleA, roleB, profile}

