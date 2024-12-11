const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
module.exports.createReview = async (req, res) => {
    let id = req.params.id;
    
    let list = await Listing.findById(id);
    newReview = new Review(req.body);
    newReview.author = req.user._id;
    await newReview.save();
    list.reviews.push(newReview);
    console.log(newReview);
    
    await list.save();
    console.log("Review added..");
    req.flash("success", "New Review Added..");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    console.log("req.params", req.params);
    let { id, rid } = req.params;
    console.log(id);
    console.log(rid);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: rid } });
    await Review.findByIdAndDelete(rid);
    console.log("Review deleted..");
    req.flash("success", "Review Deleted..");
    res.redirect(`/listings/${id}`);
}