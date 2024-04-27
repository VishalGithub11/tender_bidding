// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {register, login, profile} = require('../controllers/userController');
const verifyUser = require('../middleware/verifyUser');

router.post('/register', register);
router.post('/login', login);
router.get('/get-profile', verifyUser, profile);

module.exports = router;
