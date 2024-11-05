// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categories: [String], 
   
},{collection: 'categories'});

const Categories =  mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Categories
