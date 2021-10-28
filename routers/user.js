const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
const passport = require('passport');
const { userController } = require('../controllers');
//회원가입
router.post('/signup', Validator('signup'), userController.signup);
//이메일 중복확인
router.post('/email_check', userController.email_check);
//닉네임 중복확인
router.post('/nickname_check', userController.nickname_check);

router.get('/fail', async (req, res, next) => {
  res.status(400).send({ message: '로그인 실패' });
}); //로그인 실패시에

router.post('/signin/kakao', getKakaoUser, auth);

//로컬로그인
router.post(
  '/signin',
  Validator('login'),
  passport.authenticate('local', {
    session: false,
    failureRedirect: '/user/fail',
  }),
  userController.signin
);

//카카오 로그인
//localhost:3000/user/singin/kakao
router.get(
  // '/signin/kakao',
  passport.authenticate('kakao', {
    session: false, //우리는 세션지원이 필요하지 않음
    failureRedirect: '/user/fail',
  })
);

router.get(
  '/signin/kakao/callback',
  passport.authenticate('kakao'),
  // (req, res) => {
  //   res.redirect('/');
  // },
  userController.kakaoCallback
);

//구글 로그인
router.get(
  '/signin/google',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/fail',
    scope: ['profile', 'email'], //google을 통한 인증에는 추가 scope매개변수가 필요범위 매개 변수는 openid 값으로 시작하고 profile 값, email 값 또는 둘 다를 포함해야합니다.
  })
);

router.get(
  '/signin/google/callback',
  passport.authenticate('google'),
  userController.googleCallback
);

module.exports = router;
