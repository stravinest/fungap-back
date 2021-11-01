const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.getNewAuth = async function (refreshToken) {
  
  const info = await User.findOne({
    attributes: ['user_id', 'email', 'nickname', 'img', 'communityNickname'],
    where: { refreshToken },
  });

  if (info) {
    const basicInfo = {
      userId: info.user_id,
      email: info.email,
      nickname: info.nickname,
      img: info.img,
      provider: info.provider
    };
    console.log(basicInfo)
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return {
      accessToken,
      userId: info.user_id,
      nickname: info.nickname,
      img: info.img,
      provider: info.provider,
      refreshToken: refreshToken
    };
  }
  return null;
};
