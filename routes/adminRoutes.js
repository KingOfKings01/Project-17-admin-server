const express = require('express');
const {
    createAdmin,
    authenticateAdmin
} = require('../controllers/adminControllers');

const router = express.Router();

router.post('/sing-in', createAdmin);
router.post('/login', authenticateAdmin);

module.exports = router;