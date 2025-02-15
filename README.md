# Yumlytic

**Yumlytic** is a web application that allows users to discover, view, and save their favorite recipes. Users can search for recipes by ingredients, view detailed instructions, and manage their saved recipes effortlessly.

## 🚀 Features
- 🌎 **Search Recipes**: Find recipes by entering ingredients.
- 📖 **View Recipe Details**: See full recipe instructions, category, and images.
- 💾 **Save Recipes**: Bookmark favorite recipes for easy access.
- ❌ **Remove Recipes**: Manage saved recipes by removing unwanted ones.
- 🌙 **Dark Mode**: Toggle between light and dark themes.

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: Fetch recipes using an external API
- **Deployment**: Hosted on Render

## 📂 Project Structure
```
Yumlytic/
│── frontend/
│   ├── index.html
│   ├── recipe-details.html
│   ├── saved-recipes.html
│   ├── css/
│   │   ├── styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── details.js
│   │   ├── saved.js
│── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── recipeRoutes.js
│   ├── models/
│   │   ├── Recipe.js
│── README.md
```

## 🔧 Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/yumlytic.git
   cd yumlytic
   ```
2. **Setup backend**:
   ```sh
   cd backend
   npm install
   node server.js
   ```
3. **Setup frontend**:
   ```sh
   cd ../frontend
   Open index.html in a browser
   ```

## 🌍 Deployment
- **Live Demo**: [Yumlytic on Render](https://recipe-finder-z14f.onrender.com)
- **Backend URL**: `https://your-backend-url.onrender.com`

## 🎯 Future Enhancements
- User authentication for personalized recipe saving
- Enhanced search filters (dietary restrictions, cuisine type)
- Meal planning feature

## 📜 License
This project is licensed under the MIT License.

---
Made with ❤️ by [Your Name]

