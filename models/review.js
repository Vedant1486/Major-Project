const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // This should match your User model
    required: true,
  }
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt

module.exports = mongoose.model("Review", reviewSchema);
