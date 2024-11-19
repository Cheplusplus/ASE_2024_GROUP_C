import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  recipeId: {
    type: String, // Reference to the recipe's _id
    ref: "Recipe", // Optional: If you have a Recipe model
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings are between 1 and 5
  },
  reviewerName: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
