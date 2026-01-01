require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Mount routes
app.use("/api/products", productRoutes);




// Test route
app.get("/", (req, res) => {
  res.send("Backend connected to DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
