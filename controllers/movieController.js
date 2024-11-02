const { PrismaClient } = require("@prisma/client");
const { handleImageUpload } = require("../Firebase/ImageUpload");
const { movie } = new PrismaClient();


const getAllMovies = async (req, res) => {
  try {
    const movies = await movie.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new movie
const createMovie = async (req, res) => {
  try {
    const {
      poster,
      name,
      description,
      director,
      genre,
      releaseDate,
      language,
      imdbRating,
      trailerLink,
      categoryId,
    } = req.body;

      const imageUrl = await handleImageUpload(
        req.file.path,
        req.file.originalname
      )     

    const newMovie = await movie.create({
      data: {
        poster,
        heroSectionImage: imageUrl,
        name,
        description,
        director,
        genre,
        releaseDate: new Date(releaseDate),
        language,
        imdbRating: parseFloat(imdbRating),
        trailerLink,
        categoryId: +categoryId,
      },
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


// Update a movie
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      poster,
      name,
      description,
      director,
      genre,
      releaseDate,
      heroSectionImage,
      language,
      imdbRating,
      trailerLink,
      categoryId,
    } = req.body;

    
    let imageUrl = heroSectionImage
    if(req.file){
      imageUrl = await handleImageUpload(
        req.file.path,
        req.file.originalname
      )     
    }
    
    
    const updatedMovie = await movie.update({
      where: { id: parseInt(id, 10) },
      data: {
        poster,
        heroSectionImage: imageUrl,
        name,
        description,
        director,
        genre,
        releaseDate: new Date(releaseDate),
        language,
        imdbRating: parseFloat(imdbRating),
        trailerLink,
        categoryId: +categoryId,
      },
    });

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.log(error);
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
    if (error.code === 'P2003') {  // Prisma specific error code for foreign key constraint violation
      return res.status(400).json({ error: 'Cannot delete movie because it is associated with showtimes.' });
    }
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};
