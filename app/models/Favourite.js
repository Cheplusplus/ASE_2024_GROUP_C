import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: String,
    ref: 'Recipe',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true,
  collection: 'favourites'
});

// Compound unique index to prevent duplicate favourites
FavouriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

// Static method to get user's favourite recipes
FavouriteSchema.statics.getUserFavourites = async function(userId) {
  return await this.find({ user: userId }).populate('recipe');
};

// Static method to get favourites count for a user
FavouriteSchema.statics.getFavouritesCount = async function(userId) {
  return await this.countDocuments({ user: userId });
};

const Favourite = mongoose.models.Favourite || mongoose.model('Favourite', FavouriteSchema);

export default Favourite;