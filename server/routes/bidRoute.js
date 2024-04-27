// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {createBid,getAllBids} = require('../controllers/bidController');
const verifyUser = require('../middleware/verifyUser');

router.post('/create', verifyUser, createBid);
router.get('/getAll', verifyUser, getAllBids);

module.exports = router;
