const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/happy-man-in-snorkeling-mask-dive-underwater-with-tropical-fishes-in-coral-reef-sea-pool-travel-lifestyle-water-sport-outdoor-adventure-swimming-lessons-on-summer-beach-holiday-aerial-view-from-the-drone-iId6d_e_ND4",
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
  category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"],
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: false, // Optional for Mapbox geocoding
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  }, // ✅ Comma added here
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Middleware to delete reviews if listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
