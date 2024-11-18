// models/Favourite.js
import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipeId: {
    type: String,
    ref: 'Recipe',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Compound index to ensure a user can't favourite the same recipe twice
FavouriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

// Add a static method to get favourites count for a user
FavouriteSchema.statics.getFavouritesCount = async function(userId) {
  return await this.countDocuments({ userId });
};

export default mongoose.models.Favourite || mongoose.model('Favourite', FavouriteSchema);