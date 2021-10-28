const { jwtCreate } = require('../utils/jwt');
const { loginUser } = require('../utils/setLoginUser');
const User = require('../models/user');

exports.auth = async (req, res, next) => {
  try {
    const profile = req.kakao;
    console.log(profile);
    console.log(profile.data.kakao_account.profile);
    const [accessToken, refreshToken] = await jwtCreate(profile);
    const token = loginUser(accessToken, refreshToken);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
