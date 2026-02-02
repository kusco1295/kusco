const express = require('express');
const adminController = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', (req, res) => adminController.signup(req, res));
router.post('/login', (req, res) => adminController.login(req, res));
router.get('/me', protect, (req, res) => adminController.getMe(req, res));

module.exports = router;
