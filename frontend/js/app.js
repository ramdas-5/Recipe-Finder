const BACKEND_URL = "https://recipe-finder-z14f.onrender.com"; // ✅ Use your deployed backend

async function searchRecipes() {
    const searchInput = document.getElementById("search").value.trim();

    try {
        console.log(`Searching for: ${searchInput}`);

        const response = await fetch(`${BACKEND_URL}/api/recipes/search?ingredient=${searchInput}`);
        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received Data:", data);

        let recipesHTML = "";
        if (data.meals && Array.isArray(data.meals) && data.meals.length > 0) {
            data.meals.forEach(recipe => {
                recipesHTML += `
                    <div class="recipe-card">
                        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                        <h3>${recipe.strMeal}</h3>
                        <a href="recipe-details.html?id=${recipe.idMeal}">View Details</a>
                    </div>
                `;
            });
        } else {
            console.warn("No recipes found for:", searchInput);
            recipesHTML = "<p>No recipes found.</p>";
        }

        document.getElementById("recipe-list").innerHTML = recipesHTML;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        document.getElementById("recipe-list").innerHTML = `<p>Failed to load recipes. ${error.message}</p>`;
    }
}


// ✅ Dark Mode Toggle
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
