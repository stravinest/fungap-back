const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
const { gameController } = require('../controllers');
const { authenticateJWTall } = require('../middlewares/authenticateJWTall');

///games/
//전체게임조회
router.get('/', authenticateJWTall, gameController.getGameAll);

//게임 상세조회
router.get('/:game_id', authenticateJWTall, gameController.getGameDetail);

//game 생성
router.post('/write', authenticateJWTall, gameController.writeGame);

//game 수정
router.patch('/:game_id/edit', authenticateJWTall, gameController.editGame);

//game 삭제
router.delete(
  '/:game_id/delete',
  authenticateJWTall,
  gameController.deleteGame
);
//game 선택
router.post('/:game_id', authenticateJWTall, gameController.selectGame);

router.post('/:game_id/like', authenticateJWTall, gameController.likeGame);

router.post(
  '/:game_id/comment',
  authenticateJWTall,
  gameController.writeComment
);

router.patch(
  '/:game_id/comment/:game_comment_id',
  authenticateJWTall,
  gameController.editComment
);

router.delete(
  '/:game_id/comment/:game_comment_id',
  authenticateJWTall,
  gameController.deleteComment
);
module.exports = router;
