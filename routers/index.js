const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// const authRouter = require('./auth');
const userRouter = require('./user');

router.use('/user', [userRouter]);

// router.use('/auth', [authRouter]);

// const postRouter = require('./post');
// const userRouter = require('./user');
// const likesRouter = require('./likes');
// const commRouter = require('./comment');

// router.use('/post', [postRouter]);
=======
const authRouter = require('./auth');
const userRouter = require('./user');
// const likesRouter = require('./likes');
// const commRouter = require('./comment');
router.use('/user', [userRouter]);
router.use('/auth', [authRouter]);
>>>>>>> be019c35792193b53db4144522a341a90ebecba6
// router.use('/comment', [commRouter]);
// router.use('/like', [likesRouter]);

module.exports = router;
