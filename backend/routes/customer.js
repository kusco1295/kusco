const express = require('express');
const customerController = require('../controllers/customer.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, (req, res) => customerController.getAll(req, res));
router.post('/', protect, (req, res) => customerController.create(req, res));
router.put('/:id', protect, (req, res) => customerController.update(req, res));
router.delete('/:id', protect, (req, res) => customerController.delete(req, res));

module.exports = router;
