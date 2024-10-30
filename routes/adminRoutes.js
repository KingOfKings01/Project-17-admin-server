const express = require('express');
const {
    createAdmin,
    authenticateAdmin
} = require('../controllers/adminControllers');

const router = express.Router();

router.post('/sign-in', createAdmin);
router.post('/login', authenticateAdmin);

module.exports = router;