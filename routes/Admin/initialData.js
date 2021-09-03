const express = require('express');
const router = express.Router();
const { initialData } = require('../../controllers/Admin/initialDataController');

router.post('/initialdata', initialData);
module.exports = router;