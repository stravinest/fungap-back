import * as express from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import { checkAuthority } from '../middlewares/checkAuthority';
import { adminController } from '../controllers';
const router = express.Router();

router.get('/board', authenticateJWT, checkAuthority, adminController.getBoardFunc);
router.post('/board/write', authenticateJWT, checkAuthority, adminController.writeBoardFunc);
router.patch(
  '/board/:board_id/edit',
  authenticateJWT,
  checkAuthority,
  adminController.editBoardFunc
);
router.delete(
  '/board/:board_id/delete',
  authenticateJWT,
  checkAuthority,
  adminController.deleteBoardFunc
);
router.get(
  '/board/:board_id/detail',
  authenticateJWT,
  checkAuthority,
  adminController.detailBoardFunc
);
router.get('/user', authenticateJWT, checkAuthority, adminController.getUserFunc);
router.post('/user/:user_id/comment', authenticateJWT, checkAuthority, adminController.getCommentFunc);

export default router;
