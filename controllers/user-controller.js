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
const signUp = async (req, res) => {
  try {
    //   const signUpSchema = Joi.object({
    //     email: Joi.string()
    //       .email()
    //       .required()
    //       .error(new Error('이메일 형식에 맞춰 주세요.')),
    //     password: Joi.string()
    //       .pattern(new RegExp(/^[a-zA-Z0-9]+[a-z0-9~!@#$%^&*()_+<>?:{}]{5,20}$/))
    //       .required()
    //       .error(
    //         new Error(
    //           '비밀번호는 영문과 숫자를 포함해야하며 5~20자만 가능합니다.'
    //         )
    //       ),
    //     confirm_password: Joi.equal(Joi.ref('password')).error(
    //       new Error('비밀번호와 비밀번호 확인란이 일치하지 않습니다.')
    //     ),
    //     nickname: Joi.string()
    //       .pattern(new RegExp(/^[a-zA-Z가-힣]+[a-zA-z가-힣0-9]{2,8}$/))
    //       .error(
    //         new Error(
    //           '닉네임은 한글, 영어로 시작하는 숫자를 이용한 2~8자여야만 합니다.'
    //         )
    //       ),
    //   });

    //   const { email, password, confirm_password, nickname} =
    //     await signUpSchema.validateAsync(req.body);

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

module.exports = {
  signIn,
  signUp,
  checkEmail,
  checkNickname,
};
