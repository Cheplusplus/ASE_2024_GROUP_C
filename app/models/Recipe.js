import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  prep: Number,
  cook: Number,
  category: String,
  servings: String,
  published: Date,
  tags: [String],
  ingredients: {
    type: Map,
    of: String,
  },
  images: [String],
  instructions: [String],
  nutrition: {
    calories: String,
    fat: String,
    saturated: String,
    sodium: String,
    carbohydrates: String,
    fiber: String,
    sugar: String,
    protein: String,
  },
}, {collection: 'recipes'});

// Use 'Recipe' as the model name
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);


export default Recipe;

