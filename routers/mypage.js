const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
const { userController } = require('../controllers');
const { getKakaoUser } = require('../middlewares/getKakaoUser');
const { getGoogleUser } = require('../middlewares/getGoogleUser');
const { getNaverUser } = require('../middlewares/getNaverUser');

//회원가입
router.post('/signup', Validator('signup'), userController.signup);
//이메일 중복확인
router.post('/email_check', userController.email_check);
//닉네임 중복확인
router.post('/nickname_check', userController.nickname_check);

//카카오 로그인
router.post('/signin/kakao', getKakaoUser, userController.auth);
//구글 로그인
router.post('/signin/google', getGoogleUser, userController.authGoogle);
//네이버 로그인
router.post('/signin/naver', getNaverUser, userController.authNaver);
//

module.exports = router;
