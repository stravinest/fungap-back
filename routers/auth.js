const express = require('express');
const router = express.Router(); // 라우터라고 선언한다.
// const passport = require('passport');
const { authController } = require('../controllers');
//이메일 보내기
router.post('/email', authController.email_check);
//이메일 인증완료시 호출
router.post('/email/check', authController.nickname_check);

module.exports = router;
