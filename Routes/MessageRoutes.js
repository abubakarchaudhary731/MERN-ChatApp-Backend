const express = require('express');
const { protect } = require('../Middleware/AuthMiddleware');
const { sendMessage, allMessages } = require('../Controller/MessageController');

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);


module.exports = router;