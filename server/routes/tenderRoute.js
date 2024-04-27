// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const { createTender, getAllTenders } = require('../controllers/TenderController');
const isAdmin = require('../middleware/isAdmin');

router.post('/create', verifyUser,isAdmin, createTender);
router.get('/getAll', verifyUser, getAllTenders);

module.exports = router;
