const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const adminRouter = require('./admin');
const homeRouter = require('./home');
// const likesRouter = require('./likes');
// const commRouter = require('./comment');
router.use('/user', [userRouter]);
router.use('/auth', [authRouter]);
router.use('/admin', [adminRouter]);
router.use('/home', [homeRouter]);
// router.use('/comment', [commRouter]);
// router.use('/like', [likesRouter]);

module.exports = router;
