import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    prepTime: Number,
    cookTime: Number,
    totalTime: Number,
    servings: Number,
    ingredients: [String],
    instructions: [String],
    image: String,
  }, { collection: 'recipes' });  // Explicitly specify the collection name
  
  const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
  
  export default Recipe;
  