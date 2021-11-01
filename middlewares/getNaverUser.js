const axios = require('axios');

exports.getNaverUser = async (req, res, next) => {
  const { access_token } = req.body;
  
  try {
    const Authorization = `Bearer ${access_token}`;
    const profile = await axios({
      method: 'get',
      url: 'https://openapi.naver.com/v1/nid/me',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization,
      },
    });
    req.naver = profile.data;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
