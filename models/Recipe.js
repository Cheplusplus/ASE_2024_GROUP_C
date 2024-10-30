import mongoose from 'mongoose';

// Check if the model already exists, only define it if it doesn't
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
}, { collection: 'recipes' });

// Add a text index to optimize search on title, description, and tags
RecipeSchema.index(
  { title: "text", description: "text", tags: "text" },
  { weights: { title: 5, description: 2, tags: 1 } }
);

// Define the Recipe model only if it has not been defined before
const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe;
