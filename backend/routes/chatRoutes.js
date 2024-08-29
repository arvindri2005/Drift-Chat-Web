const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { acessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require('../controllers/chatController');

const router = express.Router();

router.route('/').post(protect, acessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupRemove').put(protect, removeFromGroup);
router.route('/groupAdd').put(protect, addToGroup);

module.exports = router;