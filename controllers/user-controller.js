const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const signIn = async (req, res, next) => {
  try {
    const user = req.body;
  } catch (err) {
    console.log(err);
  }
};

//회원가입
const signup = async (req, res) => {
  try {
    const { nickname, email, user_mbti, password, confirm_password } = req.body;
    const isExistEmail = await User.findOne({ where: { email } });

    const hashPassword = await bcrypt.hash(password, 10);

    if (isExistEmail) {
      res.status(400).send({
        msg: 'fail',
        error: '이미 사용중인 이메일 입니다.',
      });
      return;
    }
    if (password !== confirm_password) {
      res.status(400).send({
        result: 'fail',
        error: '패스워드와 패스워드 확인란이 일치하지 않습니다.',
      });
      return;
    }
    await User.create({
      email,
      nickname,
      user_mbti,
      password: hashPassword,
    });
    res.status(201).send({
      result: 'success',
      nickname: nickname,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//이메일 중복체크
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const isExistEmail = await User.findOne({ where: { email } });

    if (isExistEmail) {
      res.status(400).send({
        msg: '이미 사용중인 이메일이 있습니다.',
      });
      return;
    }
    res.status(201).send({
      result: 'success',
      is_Email: false,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//닉네임 중복체크
const checkNickname = async (req, res) => {
  try {
    const { nickname } = req.body;
    const isExistNickname = await User.findOne({ where: { nickname } });

    if (isExistNickname) {
      res.status(400).send({
        msg: '이미 사용중인 닉네임 입니다.',
      });
      return;
    }
    res.status(201).send({
      result: 'success',
      is_nickname: false,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//로그인
const signin = async (req, res, next) => {
  try {
    const user = req.user;
    console.log('유저는', req.user);
    console.log('유저아이디는', user.user_id);
    const user_id = user.user_id;
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    const refresh_token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });

    await User.update({ refresh_token }, { where: { user_id } });
    res.status(200).send({ message: 'success', token: token });
  } catch (err) {
    res.status(400).send({ message: err + ' : login failed' });
  }
};

module.exports = {
  signIn,
  signup,
  checkEmail,
  checkNickname,
  signin,
};
