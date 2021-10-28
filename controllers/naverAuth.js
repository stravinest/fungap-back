const { jwtCreate } = require('../utils/naverJwt');
const { loginUser } = require('../utils/setLoginUser');
const User = require('../models/user');

exports.naverAuth = async (req, res, next) => {
  try {
    const profile = req.naver;
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
