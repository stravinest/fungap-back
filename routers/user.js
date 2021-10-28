const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router();
const { userController } = require('../controllers');
const { getKakaoUser } = require('../middlewares/getKakaoUser');
const { auth } = require('../controllers/auth');

//회원가입
router.post('/signup', Validator('signup'), userController.signup);

//이메일 중복확인
router.post('/email_check', Validator('checkEmail'), userController.checkEmail);

//닉네임 중복확인
router.post(
  '/nickname_check',
  Validator('checkNickname'),
  userController.checkNickname
);

// router.post('/signin');

router.post('/signin/kakao', getKakaoUser, auth);

module.exports = router;
