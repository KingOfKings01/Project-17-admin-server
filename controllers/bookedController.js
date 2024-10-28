const { PrismaClient } = require('@prisma/client');
const {booked} = new PrismaClient();

// Get all booked entries
const getAllBookings = async (req, res) => {
  try {
    const bookings = await booked.findMany();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await booked.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBookings,
  deleteBooking,
};
