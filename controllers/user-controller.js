const {
  jwtKakaoCreate,
  jwtGoogleCreate,
  jwtNaverCreate,
  jwtLocalCreate,
} = require('../utils/createJWT');
const { loginUser } = require('../utils/setLoginUser');
const jwt = require('jsonwebtoken');
const {
  Board,
  User,
  Like,
  Comment,
  sequelize,
  Sequelize,
} = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

//카카오
const auth = async (req, res, next) => {
  try {
    const profile = req.kakao;
    const [accessToken, refreshToken, basicInfo] = await jwtKakaoCreate(
      profile
    );

    const token = loginUser(accessToken, refreshToken);
    console.log(token);
    const user = {
      user_image: basicInfo.user_image,
      nickname: basicInfo.nickname,
      user_mbti: basicInfo.user_mbti,
      user_id: basicInfo.user_id,
      user_authority: basicInfo.user_authority,
    };
    res.json({
      result: 'success',
      token,
      user,
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
    const [accessToken, refreshToken, basicInfo] = await jwtGoogleCreate(
      profile
    );
    const token = loginUser(accessToken, refreshToken);
    const user = {
      user_image: basicInfo.user_image,
      nickname: basicInfo.nickname,
      user_mbti: basicInfo.user_mbti,
      user_id: basicInfo.user_id,
      user_authority: basicInfo.user_authority,
    };
    res.json({
      result: 'success',
      token,
      user,
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

    const [accessToken, refreshToken, basicInfo] = await jwtNaverCreate(
      profile
    );
    const token = loginUser(accessToken, refreshToken);
    const user = {
      user_image: basicInfo.user_image,
      nickname: basicInfo.nickname,
      user_mbti: basicInfo.user_mbti,
      user_id: basicInfo.user_id,
      user_authority: basicInfo.user_authority,
    };
    res.json({
      result: 'success',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//회원가입
const signup = async (req, res) => {
  try {
    const { nickname, email, user_mbti, password, confirm_password } = req.body;
    const existUserId = await User.findOne({
      where: {
        [Op.and]: { user_delete_code: 0, email: email },
      },
    });

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
//로컬로그인
const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const userCheck = await User.findOne({
      where: {
        [Op.and]: { user_delete_code: 0, email: email },
      },
    }); //users로 받으면 안되네??

    if (!userCheck) {
      res.status(400).send({
        result: 'fail',
        errorMessage: '찾으시는 아이디가 없습니다.',
      });
      return;
    }

    const authenticate = await bcrypt.compare(password, userCheck.password);

    if (authenticate === true) {
      console.log('비밀번호 맞으면 실행');
      const [accessToken, refreshToken] = await jwtLocalCreate(userCheck);
      const token = loginUser(accessToken, refreshToken);
      console.log(userCheck);
      const user = {
        user_image: userCheck?.dataValues?.user_image,
        nickname: userCheck?.dataValues?.nickname,
        user_mbti: userCheck?.dataValues?.user_mbti,
        user_id: userCheck?.dataValues?.user_id,
        user_authority: userCheck?.dataValues?.user_authority,
      };
      res.json({
        result: 'success',
        token,
        user,
      });
    } else {
      res.status(400).send({
        result: 'fail',
        errorMessage: '비번이 틀렸습니다.',
      });
      return;
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      result: 'fail',
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
      res.status(409).send({
        result: 'fail',
        errormessage: '이미 사용중인 이메일이 있습니다.',
      });
      return;
    }
    res.status(201).send({
      result: 'success',
      is_Email: false, //협의 해볼것
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      result: 'fail',
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
      res.status(409).send({
        errorMessage: '이미 사용중인 닉네임이 있습니다.',
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
  login,
  email_check,
  nickname_check,
};
