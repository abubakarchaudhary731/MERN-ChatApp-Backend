const express = require('express');
const {registerUser, loginUser, getSearchUsers} = require('../Controller/UserController');
const { protect } = require('../Middleware/AuthMiddleware');

const router = express.Router();

router.route('/').get(protect, getSearchUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router