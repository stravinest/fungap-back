import * as express from 'express';
import { mypageController } from '../controllers';
import authenticateJWT from '../middlewares/authenticateJWT';
const router = express.Router(); // 라우터라고 선언한다.

router.get('/', authenticateJWT, mypageController.getUserInfo);

router.patch(
  '/edit',
  authenticateJWT,
  mypageController.patchUserInfo
);

router.delete('/delete', authenticateJWT, mypageController.deleteUserInfo);

router.get('/liked', authenticateJWT, mypageController.likedBoardList);

export default router;
