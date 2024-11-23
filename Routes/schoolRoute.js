const express = require('express');
const schoolController = require('../Controller/schoolController');


const router = express.Router();
router.post('/addSchool', schoolController.addSchool);
router.get('/listSchools',schoolController.listSchools)

module.exports = router;
