const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }

    const review = new Review(req.body.review);
    review.author = req.user._id;
    await review.save();

    listing.reviews.push(review);
    await listing.save();

    req.flash("success", "New review added!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("CREATE REVIEW ERROR:", err);
    req.flash("error", "Failed to create review.");
    res.redirect(`/listings/${req.params.id}`);
  }
};

module.exports.destroyReview = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;

    // Remove the review reference from the listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    req.flash("error", "Failed to delete review.");
    res.redirect(`/listings/${req.params.id}`);
  }
};
