
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
  if (req.session.userRole !== 'clientA') {
    console.log(req.session.userId);
    
    const error = "Can't view this page!";
    res.redirect(`/profile?error=${error}`);
  } else {
    next();
  }
}


const roleB = function (req, res, next) {
  if (req.session.userRole !== 'clientB') {
    console.log(req.session.userId);
    
    const error = "Can't view this page!";
    res.redirect(`/profile?error=${error}`);
  } else {
    next();
  }
}


const profile = function (req, res, next) {
  if (req.session.profile !== 'pass') {
    
    const error = "Please set profile first";
    res.redirect(`/profile/set?error=${error}`);
  } else {
    console.log(req.session.profile);
    next();
  }
}


module.exports = {protector, roleA, roleB, profile}

