const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const pdata = await Listing.find({});
    res.render("listings/index.ejs", { pdata });
}

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showlistings=async (req, res) => {
    let id = req.params.id;
    let list = await Listing.findById(id).
    populate({path:"reviews",
        populate:{path:"author"}})
        .populate("owner");
    if(!list){
        req.flash("error","Listing not found..");
        return res.redirect("/listings");
    };
    res.render("listings/show.ejs", { list });
}

module.exports.createlisting=async (req, res) => {
        
    let newdata = req.body;
    const listing = new Listing(newdata);
    listing.owner = req.user._id;
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image.url=url;
        listing.image.filename=filename;
    }
    
    await listing.save();
    console.log("Data Saved..");
    req.flash("success", "New Listing Created..");
    res.redirect("/listings");
}

module.exports.editlisting = async (req, res) => {
    let id = req.params.id;
    let list = await Listing.findById(id);
    if(!list){
        req.flash("error","Listing not found..");
        return res.redirect("/listings");
    };
    res.render("listings/edit.ejs", { list });
}

module.exports.updatelisting = async (req, res) => {
    console.log(req.file);
    let id = req.params.id;
    let listing=await Listing.findById(id);

    await Listing.findByIdAndUpdate(id, { ...req.body });
    
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image.url=url;
        listing.image.filename=filename;
    }
    await listing.save();
    
    console.log("Edited..");
    req.flash("success", "Listing Edited..");
    res.redirect(`/listings/${id}`);
}

module.exports.deletelisting = async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    console.log("Deleted..");
    req.flash("success", "Listing Deleted..");
    res.redirect("/listings");
}