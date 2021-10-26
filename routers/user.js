const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
// const passport = require('passport');
const { userController } = require('../controllers');
//회원가입
router.post('/signup', Validator('signup'), userController.signup);
//이메일 중복확인
router.post('/email_check', userController.email_check);
//닉네임 중복확인
router.post('/nickname_check', userController.nickname_check);

// //로컬로그인
// router.post(
//   '/signin',
//   passport.authenticate('local', {
//     session: false,
//     failureRedirect: '/auth/fail',
//   }),
//   userController.signIn
// );
// //카카오로그인
// router.post(
//   '/signin/kakao',
//   passport.authenticate('local', {
//     session: false,
//     failureRedirect: '/auth/fail',
//   }),
//   authController.logIn
// );
// //구글로그인
// router.post(
//   '/signin/google',
//   passport.authenticate('local', {
//     session: false,
//     failureRedirect: '/auth/fail',
//   }),
//   authController.logIn
// );

module.exports = router;
