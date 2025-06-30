const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapToken });

// Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();

        const geometry = geoData.body.features[0]?.geometry;
        if (!geometry) {
            req.flash("error", "Invalid location. Please enter a valid place.");
            return res.redirect("/listings/new");
        }

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.geometry = geometry;

        if (req.file) {
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }

        await newListing.save();
        req.flash("success", "New listing created!");
        res.redirect(`/listings/${newListing._id}`);
    } catch (err) {
        console.error("CREATE LISTING ERROR:", err);
        req.flash("error", "Something went wrong while creating the listing.");
        res.redirect("/listings/new");
    }
};

// Show single listing
module.exports.showListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author"
                }
            })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        res.render("listings/show", { listing });
    } catch (err) {
        console.error("SHOW LISTING ERROR:", err);
        req.flash("error", "Something went wrong while fetching the listing.");
        res.redirect("/listings");
    }
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        const originalImageUrl = listing.image?.url || "/images/default.jpg";
        res.render("listings/edit", { listing, originalImageUrl });
    } catch (err) {
        console.error("EDIT FORM ERROR:", err);
        req.flash("error", "Something went wrong while loading edit form.");
        res.redirect("/listings");
    }
};

// Update listing
module.exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

        if (req.file) {
            listing.image = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }

        await listing.save();
        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.error("UPDATE LISTING ERROR:", err);
        req.flash("error", "Error updating listing.");
        res.redirect("/listings");
    }
};

// Delete listing
module.exports.destroyListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "Listing deleted.");
        res.redirect("/listings");
    } catch (err) {
        console.error("DELETE LISTING ERROR:", err);
        req.flash("error", "Error deleting listing.");
        res.redirect("/listings");
    }
};
