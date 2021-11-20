import * as express from 'express';
//Validator 처리법 생각해야 한다.

const router = express.Router(); // 라우터라고 선언한다.

import { mypageController } from '../controllers';
import authenticateJWT from '../middlewares/authenticateJWT';

router.get('/', authenticateJWT, mypageController.getUserInfo);

router.patch('/edit', authenticateJWT, mypageController.patchUserInfo);

router.delete('/delete', authenticateJWT, mypageController.deleteUserInfo);

router.get('/liked', authenticateJWT, mypageController.likedBoardList);

export default router;
