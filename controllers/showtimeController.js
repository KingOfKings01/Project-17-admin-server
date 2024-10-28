const { PrismaClient } = require('@prisma/client');
const {showtime} = new PrismaClient();

// Get all showtimes
const getAllShowtimes = async (req, res) => {
  try {
    const showtimes = await showtime.findMany();
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new showtime
const createShowtime = async (req, res) => {
  try {
    const { movie_id, time, date } = req.body;
    const showtime = await showtime.create({
      data: { movie_id, time, date },
    });
    res.status(201).json(showtime);
  } catch (error) {
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
