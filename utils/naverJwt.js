const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Op } = require('sequelize');

exports.jwtCreate = async (profile) => {
  const basicInfo = {
    email: profile.data?.kakao_account?.email || profile.data?.properties.email,
    nickname:
      profile.data?.kakao_account?.profile.nickname ||
      profile.data?.properties.nickname,
    user_image:
      profile.data?.kakao_account?.profile.profile_image_url ||
      profile.data?.properties?.profile_image,
  };

  const snsId = profile.data?.id || profile.id;

  //refresh token 발급
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'naver' }] },
    });

    if (exUser) {
      //카카오톡 사용자의 정보를 로그인 시마다 DB에 update
      await User.update(
        {
          ...basicInfo,
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: snsId },
        }
      );
    } else {
      const user = await User.create({
        ...basicInfo,
        sns_id: snsId,
        provider: 'naver',
        refresh_token: refreshToken,
      });
    }
    //access token 발급
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return [accessToken, refreshToken];
  } catch (error) {
    console.error(error);
  }
};
