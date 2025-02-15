const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

const recipeRoutes = require("./routes/recipes");
app.use("/api/recipes", recipeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
