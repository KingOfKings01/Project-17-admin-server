const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { authorization } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authorization, getAllMovies);
router.post("/", authorization, createMovie);
router.put("/:id", authorization, updateMovie);
router.delete("/:id", authorization, deleteMovie);

module.exports = router;
