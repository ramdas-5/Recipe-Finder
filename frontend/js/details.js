const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

async function fetchRecipeDetails() {
    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p>Recipe not found.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/recipes/details/${recipeId}`);
        const data = await response.json();

        console.log("Received Recipe Details:", data); // ✅ Debug API response

        if (!data || Object.keys(data).length === 0) {
            document.getElementById("recipe-details").innerHTML = "<p>Recipe details not found.</p>";
            return;
        }

        // Display Recipe Details
        document.getElementById("recipe-details").innerHTML = `
            <h2>${data.strMeal}</h2>
            <img src="${data.strMealThumb}" alt="${data.strMeal}">
            <p><strong>Category:</strong> ${data.strCategory || "N/A"}</p>
            <p><strong>Instructions:</strong> ${data.strInstructions || "N/A"}</p>
            <button onclick="saveRecipe('${data.idMeal}')">Save Recipe</button>
        `;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        document.getElementById("recipe-details").innerHTML = "<p>Failed to load recipe details.</p>";
    }
}

async function saveRecipe(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/recipes/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId: id })
        });

        const result = await response.json();
        alert(result.message || "Recipe Saved!");
    } catch (error) {
        console.error("Error saving recipe:", error);
        alert("Failed to save recipe.");
    }
}

// Call function on page load
document.addEventListener("DOMContentLoaded", fetchRecipeDetails);


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