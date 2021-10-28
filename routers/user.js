<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const validator = require('../middlewares/validator/validator')
const signUpFunc = require("../controllers/user/signUp");
const userFunc = require("../controllers/user/logIn");
const checkFunc = require('../controllers/user/check');
const sendEmail = require('../controllers/user/checkEmail')


//회원가입
router.post("/users/signUp", validator.signUp, signUpFunc.signUp);

router.post("/users/email_check", sendEmail);

//email 중복확인
router.post("/users/email_check", validator.email, checkFunc.dupEmail);

//nickname 중복확인
router.post("/users/nickname_check", validator.nickname, checkFunc.dupNickname);

//로그인
router.post("/users/login", userFunc.logInFunc);

//로그인 인증
router.get("/users/me", authMiddleware, userFunc.authorization);
=======
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
>>>>>>> c0d0d21752ffb9467630a6d33d0336401ed33104

module.exports = router;
