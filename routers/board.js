const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
const { boardController } = require('../controllers');
const { authenticateJWT } = require('../middlewares/authenticateJWT');
///board/;
//홈화면
router.get('/home', boardController.getBoardHome);
//상황별 페이지 게시글 전체 조회
router.get('/', boardController.getSituationBoard);
//상황별 게시글
router.get('/:board_id', boardController.getDetailBoard);
// 게시글 좋아요,취소
router.post('/:board_id/like', boardController.changeLike);

module.exports = router;
