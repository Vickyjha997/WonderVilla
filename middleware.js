const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    
    //console.log(req.originalUrl);redirect to same page after login

    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash("error","Please Login into Page...")
        res.redirect("/login");
        return; // Add a return statement here
    }
    next();
}

module.exports.savedOriginalUrl=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo=req.session.returnTo;
        delete req.session.returnTo;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let id = req.params.id;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){ 
            req.flash("error","You are not authorized..");
            return res.redirect(`/listings/${id}`);
        }
        next();
    }

module.exports.validateListing=(req,res,next)=>{
    let { error } = listingSchema.validate(req.body);
        if (error) {
            let message = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400, message);
        }
        next();
    }

module.exports.validateReview=(req,res,next)=>{
 
        let { error } = reviewSchema.validate(req.body);
        if (error) {
            let message = error.details.map(el => el.message).join(",");
            throw new ExpressError(400, message);
        }
        next();
    }

module.exports.isReviewAuthor=async(req,res,next)=>{
    let { id,rid } = req.params;
    console.log(req.params);
    console.log("id",id);
    let review = await Review.findById(rid);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not authorized..");
        res.redirect(`/listings/${id}`);        
        return;
                  }
    next();
}