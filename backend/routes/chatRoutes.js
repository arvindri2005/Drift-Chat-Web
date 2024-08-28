const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { acessChat, fetchChats} = require('../controllers/chatController');

const router = express.Router();

router.route('/').post(protect, acessChat);
router.route('/').get(protect, fetchChats);
// router.route('/group').post(protect, createGroupChat);
// router.route('/remame').put(protect, renameChat);
// router.route('/groupRemove').put(protect, removeFromGroup);
// router.route('/groupAdd').put(protect, addToGroup);

module.exports = router;