// models/Category.js
import mongoose from 'mongoose';

const AllergensSchema = new mongoose.Schema({
  allergens: [String], 
   
},{collection: 'allergens'});

const Allergens =  mongoose.models.Allergen || mongoose.model('Allergen', AllergensSchema);

export default Allergens