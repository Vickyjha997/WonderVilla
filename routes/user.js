const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedOriginalUrl } = require("../middleware.js");
const { signup, login, logout } = require("../controllers/user.js");

//signup page
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//signup post route
router.post(
  "/signup",
  wrapAsync(signup)
);

//login page
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
    });

//login post route
router.post("/login",savedOriginalUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
login
);


//logout route
router.get("/logout",logout);
module.exports = router;
