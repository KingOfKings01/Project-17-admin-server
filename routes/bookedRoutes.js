const express = require('express');
const {
  getAllBookings,
  deleteBooking,
} = require('../controllers/bookedController');
const { authorization } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',authorization, getAllBookings);
router.delete('/:id',authorization, deleteBooking);

module.exports = router;