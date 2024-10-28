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

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, is_hero_section } = req.body;
    const category = await category.create({
      data: { name, is_hero_section },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_hero_section } = req.body;
    const category = await category.update({
      where: { id: parseInt(id, 10) },
      data: { name, is_hero_section },
    });
    res.status(200).json(category);
  } catch (error) {
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
  createCategory,
  updateCategory,
  deleteCategory,
};
