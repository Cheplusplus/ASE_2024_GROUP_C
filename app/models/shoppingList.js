import mongoose from 'mongoose';

const ShoppingListItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  purchased: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    default: null
  }
});

const ShoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [ShoppingListItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true,
  collection: 'shopping_lists'
});

// Compound unique index to prevent duplicate lists per user
ShoppingListSchema.index({ user: 1 }, { unique: true });

// Static method to get user's shopping list
ShoppingListSchema.statics.getUserShoppingList = async function(userId) {
  return await this.findOne({ user: userId });
};

// Static method to create or update shopping list
ShoppingListSchema.statics.createOrUpdateList = async function(userId, items) {
  return await this.findOneAndUpdate(
    { user: userId }, 
    { items }, 
    { upsert: true, new: true }
  );
};

const ShoppingList = mongoose.models.ShoppingList || mongoose.model('ShoppingList', ShoppingListSchema);

export default ShoppingList;