const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
// const passport = require('passport');
const { mbtiController } = require('../controllers');
const { authenticateJWTall } = require('../middlewares/authenticateJWTall');

//유명인mbti검색
router.post('/celebrity', mbtiController.mbtiCelebrity);

//mbti궁합 검색
router.post('/test', mbtiController.mbtiTest);

module.exports = router;
