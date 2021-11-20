const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const mypageRouter = require('./mypage');
const adminRouter = require('./admin');
const boardRouter = require('./board');
const mbtiRouter = require('./mbti');
const commRouter = require('./comment');
const chatRouter = require('./chat');

router.use('/user', [userRouter]);
router.use('/auth', [authRouter]);
router.use('/mypage', [mypageRouter]);
router.use('/admin', [adminRouter]);
// router.use('/comment', [commRouter]);
router.use('/board', [boardRouter]);
router.use('/comment', [commRouter]);
router.use('/mbti', [mbtiRouter]);
router.use('/chat', [chatRouter]);

module.exports = router;
