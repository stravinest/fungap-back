const { jwtCreate, jwtGoogleCreate, jwtNaverCreate } = require('../utils/jwt');
const { loginUser } = require('../utils/setLoginUser');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

//카카오
const auth = async (req, res, next) => {
  try {
    const profile = req.kakao;
    const [accessToken, refreshToken] = await jwtCreate(profile);
    const token = loginUser(accessToken, refreshToken);
    res.json({
      result: 'success',
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
//구글
const authGoogle = async (req, res, next) => {
  try {
    console.log(req.google);
    const profile = req.google;
    const [accessToken, refreshToken] = await jwtGoogleCreate(profile);
    const token = loginUser(accessToken, refreshToken);
    res.json({
      result: 'success',
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
//네이버
const authNaver = async (req, res, next) => {
  try {
    const profile = req.naver;

    const [accessToken, refreshToken] = await jwtNaverCreate(profile);
    const token = loginUser(accessToken, refreshToken);
    res.json({
      result: 'success',
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
//
//
//

//회원가입
const signup = async (req, res) => {
  try {
    const { nickname, email, user_mbti, password, confirm_password } = req.body;
    const existUserId = await User.findOne({ where: { email } });

    if (existUserId) {
      res.status(400).send({
        msg: 'fail',
        error: '이미 가입된 아이디가 있습니다.',
      });
      return;
    }
    if (password !== confirm_password) {
      res.status(400).send({
        result: 'fail',
        error: '패스워드를 확인해주세요',
      });
      return;
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nickname,
      user_mbti,
      password: hash,
    });
    res.status(201).send({
      result: 'success',
      nickname: nickname,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//이메일 중복체크
const email_check = async (req, res) => {
  try {
    const { email } = req.body;
    const existUserId = await User.findOne({ where: { email } });

    if (existUserId) {
      res.status(400).send({
        msg: '이미 사용중인 이메일이 있습니다.',
      });
      return;
    }
    res.status(201).send({
      result: 'success',
      is_Email: false, //협의 해볼것
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//닉네임 중복체크
const nickname_check = async (req, res) => {
  try {
    const { nickname } = req.body;
    const existUserId = await User.findOne({ where: { nickname } });

    if (existUserId) {
      res.status(400).send({
        msg: '이미 사용중인 닉네임이 있습니다.',
      });
      return;
    }
    res.status(201).send({
      result: 'success',
      is_nickname: false, //협의 해볼것
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};
module.exports = {
  authNaver,
  authGoogle,
  auth,
  signup,
  email_check,
  nickname_check,
};
