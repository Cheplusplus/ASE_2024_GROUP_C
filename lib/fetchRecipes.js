import Recipe from '@/models/Recipe';
import connectToDatabase from '@/lib/connectMongoose';

const fetchRecipes = async (skip = 0, limit = 52) => {
  await connectToDatabase();

  // Fetch recipes with pagination
  const recipes = await Recipe.find().skip(skip).limit(limit).lean();
  const total = await Recipe.countDocuments();

  return { recipes, total };
};

export default fetchRecipes;