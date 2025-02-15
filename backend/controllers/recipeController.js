const axios = require("axios");
const Recipe = require("../models/Recipe");

const API_KEY = "https://www.themealdb.com/api.php";
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

exports.searchRecipes = async (req, res) => {
    try {
        const ingredient = req.query.ingredient?.trim();

        if (!ingredient) {
            return res.status(400).json({ error: "Ingredient query is required" });
        }

        console.log("Searching for ingredient:", ingredient); // ✅ Debug input

        const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
        console.log("API Response from TheMealDB:", response.data); // ✅ Debug API response

        if (!response.data.meals) {
            console.warn(`⚠ No meals found for "${ingredient}"`);
            return res.json({ meals: [] }); // Return an empty array instead of undefined
        }

        res.json(response.data); // ✅ Send correct response to frontend
    } catch (error) {
        console.error("❌ Error fetching recipes:", error);
        res.status(500).json({ error: "Error fetching recipes" });
    }
};


exports.getRecipeDetails = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${recipeId}`);

        console.log("Backend API Response:", response.data); // Debugging

        if (!response.data.meals || response.data.meals.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(response.data.meals[0]); // ✅ Return single recipe object
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        res.status(500).json({ error: "Failed to fetch recipe details" });
    }
};



exports.saveRecipe = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const existing = await Recipe.findOne({ recipeId });

        if (!existing) {
            const newRecipe = new Recipe({ recipeId });
            await newRecipe.save();
        }

        res.json({ message: "Recipe saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving recipe" });
    }
};

exports.getSavedRecipes = async (req, res) => {
    try {
        const savedRecipes = await Recipe.find();
        res.json(savedRecipes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching saved recipes" });
    }
};

exports.removeRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findOneAndDelete({ recipeId: id });

        if (!deletedRecipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json({ message: "Recipe removed successfully" });
    } catch (error) {
        console.error("Error removing recipe:", error);
        res.status(500).json({ error: "Error removing recipe" });
    }
};
