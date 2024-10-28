const { PrismaClient } = require('@prisma/client');
const {movie} = new PrismaClient();

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movie.findMany();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { poster, hero_section_image, name, description, director, genre, release_date, language, imdb_rating, trailer_link, category_id } = req.body;
    const movie = await movie.create({
      data: { poster, hero_section_image, name, description, director, genre, release_date, language, imdb_rating, trailer_link, category_id },
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { poster, hero_section_image, name, description, director, genre, release_date, language, imdb_rating, trailer_link, category_id } = req.body;
    const movie = await movie.update({
      where: { id: parseInt(id, 10) },
      data: { poster, hero_section_image, name, description, director, genre, release_date, language, imdb_rating, trailer_link, category_id },
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await movie.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
