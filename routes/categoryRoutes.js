const express = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authorization } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authorization, getAllCategories);
router.post("/", authorization, createCategory);
router.put("/:id", authorization, updateCategory);
router.delete("/:id", authorization, deleteCategory);

module.exports = router;
