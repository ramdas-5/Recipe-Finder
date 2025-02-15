const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    recipeId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
