const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');

router.post('/', bugController.createBug);
router.get('/', bugController.getBugs);
router.patch('/:id', bugController.updateBug);
router.delete('/:id', bugController.deleteBug);

module.exports = router; 