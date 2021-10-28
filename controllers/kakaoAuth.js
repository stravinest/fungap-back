const { jwtCreate } = require('../utils/jwt');
const { loginUser } = require('../utils/setLoginUser');
const User = require('../models/user');

exports.kakaoAuth = async (req, res, next) => {
  try {
    const profile = req.kakao;
    console.log(profile);

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
