import * as express from 'express';

const router = express.Router();

import authRouter from './auth';
import userRouter from './user';
import mypageRouter from './mypage';
import adminRouter from './admin';
import boardRouter from './board';
import mbtiRouter from './mbti';
import commRouter from './comment';

router.use('/user', [userRouter]);
router.use('/auth', [authRouter]);
router.use('/mypage', [mypageRouter]);
router.use('/admin', [adminRouter]);
// router.use('/comment', [commRouter]);
router.use('/board', [boardRouter]);
router.use('/comment', [commRouter]);
router.use('/mbti', [mbtiRouter]);

export default router;
