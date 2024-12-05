import mongoose from "mongoose";

const EditDescriptionSchema = new mongoose.Schema({
  recipeId: { type: String, ref: "Recipe", required: true },
  username: { type: String, required: true },
}, { timestamps: true });

const EditDesc =  mongoose.models.EditDescription || mongoose.model("EditDescription", EditDescriptionSchema);

export default EditDesc
