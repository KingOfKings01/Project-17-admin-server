const express = require("express");

const {
  getAllShowtimes,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} = require("../controllers/showtimeController");
const { authorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authorization, getAllShowtimes);
router.post("/", authorization, createShowtime);
router.put("/:id", authorization, updateShowtime);
router.delete("/:id", authorization, deleteShowtime);

module.exports = router;
