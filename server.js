const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryRoutes = require("./routes/categoryRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showtimeRoutes = require("./routes/showtimeRoutes");
const bookedRoutes = require("./routes/bookedRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/categories", categoryRoutes);
app.use("/movies", movieRoutes);
app.use("/showtime", showtimeRoutes);
app.use("/booked", bookedRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Admin Server" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});