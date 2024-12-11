const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/review.js");




//Reviews
//post route
router.post("/", isLoggedIn,validateReview, wrapAsync(createReview));

// Delete review route
router.delete("/:rid",isLoggedIn,isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;