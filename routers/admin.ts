import * as express from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import { checkAuthority } from '../middlewares/checkAuthority';
import {
  getBoard,
  writeBoard,
  editBoard,
  deleteBoard,
  detailBoard,
  getUser,
  getComment,
} from '../controllers/admin';

const router = express.Router();

router.get('/board', authenticateJWT, checkAuthority, getBoard);
router.post('/board/write', authenticateJWT, checkAuthority, writeBoard);
router.patch(
  '/board/:board_id/edit',
  authenticateJWT,
  checkAuthority,
  editBoard
);
router.delete(
  '/board/:board_id/delete',
  authenticateJWT,
  checkAuthority,
  deleteBoard
);
router.get(
  '/board/:board_id/detail',
  authenticateJWT,
  checkAuthority,
  detailBoard
);
router.get('/user', authenticateJWT, checkAuthority, getUser);
router.post(
  '/user/:user_id/comment',
  authenticateJWT,
  checkAuthority,
  getComment
);

export default router;
