const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
// const likesRouter = require('./likes');
// const commRouter = require('./comment');
router.use('/user', [userRouter]);
router.use('/auth', [authRouter]);
// router.use('/comment', [commRouter]);
// router.use('/like', [likesRouter]);

module.exports = router;
