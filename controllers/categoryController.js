const { PrismaClient } = require('@prisma/client');
const {category} = new PrismaClient();

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get categories with movies
const getCategoriesWithMovies = async (req, res) => {
  try {
    const categoriesWithMovies = await category.findMany({
      include: {
        movies: true,
      },
    });
    res.status(200).json(categoriesWithMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch categories with movies' });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, is_hero_section } = req.body;
    const newCategory = await category.create({
      data: { name, is_hero_section },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const data = req.body;
    const updatedCategory = await category.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await category.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesWithMovies,
  createCategory,
  updateCategory,
  deleteCategory,
};
