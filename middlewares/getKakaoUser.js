const axios = require('axios');

exports.getKakaoUser = async (req, res, next) => {
  const { access_token } = req.body;
  console.log(access_token);

  try {
    const Authorization = `Bearer ${access_token}`;
    const profile = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me?secure_resource=true',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization,
      },
    });
    req.kakao = profile;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
