const express = require('express');
const router = express.Router();
const merekController = require('../controllers/merekController')

router.post('/', merekController.createMerek)
router.get('/', merekController.getAllMerek)
router.get('/:id', merekController.getMerekById)
router.put('/:id', merekController.updateMerek)
router.delete('/:id', merekController.deleteMerek)

module.exports = router;