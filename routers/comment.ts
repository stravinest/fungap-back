import * as express from 'express';
import { commentController } from '../controllers';
import authenticateJWT from '../middlewares/authenticateJWT';
import authenticateJWTall from '../middlewares/authenticateJWTall';

const router = express.Router(); // 라우터라고 선언한다.

///comment/
//댓글조회 쿼리로 완료 문제는 ESCAPE/시퀄라이즈도 해보자
router.get('/:board_id', authenticateJWTall, commentController.getComment);
//댓글작성
router.post('/:board_id', authenticateJWT, commentController.postComment);
// 댓글삭제
router.delete(
  '/:board_id/:comment_id',
  authenticateJWT,
  commentController.deleteComment
);
// 댓글 수정
router.patch(
  '/:board_id/:comment_id',
  authenticateJWT,
  commentController.patchComment
);

export default router;
