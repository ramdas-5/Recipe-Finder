const express = require("express");
const router = express.Router();
const { searchRecipes, getRecipeDetails, saveRecipe, getSavedRecipes, removeRecipe } = require("../controllers/recipeController");

router.get("/search", searchRecipes);
router.get("/details/:id", getRecipeDetails);
router.post("/save", saveRecipe);
router.get("/saved", getSavedRecipes);
router.delete("/remove/:id", removeRecipe);  // ✅ Added remove functionality

module.exports = router;
