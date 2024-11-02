const { PrismaClient } = require("@prisma/client");
const { showtime, movie } = new PrismaClient();

// Get all showtimes
const getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await showtime.findMany({
      include: {
        movie: true,
      },
    });
    res.json(showtimes);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message });
  }
};
const createShowtime = async (req, res) => {
  try {
    const { movieId, dateTime } = req.body;
    const parsedDateTime = new Date(dateTime); // Ensures it's a proper Date object

    const newShowtime = await showtime.create({
      data: {
        movieId: parseInt(movieId, 10),
        dateTime: parsedDateTime,
      },
    });

    // Fetch the movie details
    const foundMovie = await movie.findUnique({
      where: { id: parseInt(movieId, 10) },
      select: { name: true }, // Only get the movie name
    });

    res.status(201).json({ ...newShowtime, movie: foundMovie });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update a showtime
const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { movie_id, time, date } = req.body;
    const showtime = await showtime.update({
      where: { id: parseInt(id, 10) },
      data: { movie_id, time, date },
    });
    res.status(200).json(showtime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a showtime
const deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    await showtime.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
};
