const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
const { boardController } = require('../controllers');
const { authenticateJWTall } = require('../middlewares/authenticateJWTall');
const { homeSearch, situationSearch } = require('../controllers/search');
///board/;
//홈화면
router.get('/home', authenticateJWTall, boardController.getBoardHome);

//상황별 페이지 게시글 전체 조회(최신순) //쿼리스트링 값으로 page=page
router.get('/', authenticateJWTall, boardController.getSituationBoardConfirm);
//상황별 페이지 게시글 전체 조회(인기순)
router.get(
  '/popularity',
  authenticateJWTall,
  boardController.getSituationBoardPop
);
//상황별 페이지 게시글 전체 조회(조회순)
router.get('/view', authenticateJWTall, boardController.getSituationBoardView);

//상황별 게시글
router.get('/:board_id', authenticateJWTall, boardController.getDetailBoard);

// 게시글 좋아요,취소
router.post('/:board_id/like', authenticateJWTall, boardController.changeLike);

//홈 게시글 검색
router.post('/search', authenticateJWTall, homeSearch);
//상황별 게시글 검색
router.post('/situation/:keyword', situationSearch);

module.exports = router;
