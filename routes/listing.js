const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {index, showlistings, createlisting, editlisting, updatelisting, deletelisting}=require("../controllers/listings.js");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

//Index route//
router.get("/",wrapAsync(index));

//New list//
router.get("/new",isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//Show route//
router.get("/:id",wrapAsync(showlistings));

//Create route//
router.post("/",isLoggedIn,
    
    upload.single("image"),
    validateListing,
    wrapAsync(createlisting));



//Edit route//
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(editlisting));

//Update route//
router.put("/:id",isLoggedIn,isOwner,upload.single("image"),validateListing,
    wrapAsync(updatelisting)
);



//Delete route//
router.delete(
    "/:id/delete",isLoggedIn,isOwner,
    wrapAsync(deletelisting)
);

module.exports = router;
