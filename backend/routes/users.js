const express = require('express');
const { getMe, updateProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(authenticateToken);

router.get('/profile', getMe);
router.put('/profile', updateProfile);

module.exports = router;
