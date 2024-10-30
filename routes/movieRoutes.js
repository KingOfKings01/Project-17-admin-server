const express = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { authorization } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get("/", authorization, getAllMovies);
router.post("/",authorization, upload.single('heroSectionImage'), createMovie);
router.put("/:id", authorization, updateMovie);
router.delete("/:id", authorization, deleteMovie);

module.exports = router;