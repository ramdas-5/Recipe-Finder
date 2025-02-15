async function fetchSavedRecipes() {
    try {
        const response = await fetch("http://localhost:5000/api/recipes/saved");
        const savedRecipes = await response.json();

        console.log("Saved Recipes:", savedRecipes); // ✅ Debugging

        let savedHTML = "";
        if (savedRecipes.length > 0) {
            for (const recipe of savedRecipes) {
                const recipeDetails = await getRecipeDetails(recipe.recipeId);

                if (!recipeDetails) continue; // Skip if details not found

                savedHTML += `
                    <div class="recipe-card">
                        <img src="${recipeDetails.strMealThumb}" alt="${recipeDetails.strMeal}">
                        <h3>${recipeDetails.strMeal}</h3>
                        <a href="recipe-details.html?id=${recipe.recipeId}">
                            <button>View Details</button>
                        </a>
                        <button onclick="removeRecipe('${recipe.recipeId}')">Remove</button>
                    </div>
                `;
            }
        } else {
            savedHTML = "<p>No saved recipes.</p>";
        }

        document.getElementById("saved-list").innerHTML = savedHTML;
    } catch (error) {
        console.error("Error fetching saved recipes:", error);
        document.getElementById("saved-list").innerHTML = "<p>Failed to load saved recipes.</p>";
    }
}

async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`http://localhost:5000/api/recipes/details/${recipeId}`);
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error(`Error fetching details for recipe ID ${recipeId}:`, error);
        return null;
    }
}

async function removeRecipe(id) {
    if (!confirm("Are you sure you want to remove this recipe?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/recipes/remove/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();
        alert(result.message || "Recipe removed successfully!");

        // Refresh saved recipes after removal
        fetchSavedRecipes();
    } catch (error) {
        console.error("Error removing recipe:", error);
        alert("Failed to remove recipe.");
    }
}

// Load saved recipes on page load
document.addEventListener("DOMContentLoaded", fetchSavedRecipes);



const checkbox = document.getElementById("checkbox");

// Check user preference from localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    checkbox.checked = true;
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
    }
});