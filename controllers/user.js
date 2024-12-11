const User = require("../models/user.js");

module.exports.signup = async (req, res) => {
    try {
      let { email, username, password } = req.body;
      let user = new User({ email, username });
      let registeredUser = await User.register(user, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to Wondervilla..");
        res.redirect("/listings");
      });
      
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

  module.exports.login = async(req,res)=>{
    console.log("User logged in..");
    req.flash("success","Logged in...");
   
    res.redirect(res.locals.returnTo || "/listings");
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
      if(err)
        next(err);
      console.log("user loggedout...")
      req.flash("success","Logged Out...");
      res.redirect("/listings");
    })
  }