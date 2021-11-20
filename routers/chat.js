const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
const { chatController } = require('../controllers');
const { authenticateJWT } = require('../middlewares/authenticateJWT');

//챗로그
router.get('/chatlog', authenticateJWT, chatController.getChatlog);

module.exports = router;
