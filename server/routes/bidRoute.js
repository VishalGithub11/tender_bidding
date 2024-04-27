// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {createBid,getAllBidsForTender} = require('../controllers/bidController');
const verifyUser = require('../middleware/verifyUser');

router.post('/create', verifyUser, createBid);
router.get('/getAll/:tenderId', verifyUser, getAllBidsForTender);

module.exports = router;
