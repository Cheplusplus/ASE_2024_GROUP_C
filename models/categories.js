// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categories: [String], // Array of category names
});

const Categories =  mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Categories
