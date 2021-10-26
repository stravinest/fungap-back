const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인필요');
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

//salt 값 지정
const saltAppointed = function (pw, salt) {
  console.log('salt넣습니다.');
  pw = crypto
    .createHash('sha512')
    .update(pw + salt)
    .digest('hex');
  return pw;
};

const updateUserRefreshToken = async (refresh_token, user_id) => {
  await User.update({ refresh_token }, { where: { user_id } });
  return true;
};

const signIn = async (req, res, next) => {
  try {
    const user = req.user;
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    const refresh_token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
    await authService.updateUserRefreshToken(refresh_token, user.user_id);
    res.status(200).send({ message: 'success', token: token });
  } catch (err) {
    res.status(400).send({ message: err + ' : login failed' });
  }
};

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
  signIn,
  signup,
  email_check,
  nickname_check,
  isLoggedIn,
  isNotLoggedIn,
};
