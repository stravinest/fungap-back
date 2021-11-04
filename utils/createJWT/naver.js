const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { Op } = require('sequelize');

exports.jwtNaverCreate = async (profile) => {
  const basicInfo = {
    email: profile?.response?.email,
    nickname: profile?.response?.nickname,
    user_image: profile?.response?.profile_image,
    provider: 'naver',
  };

  const snsId = profile?.response?.id;

  //refresh token 발급
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
  console.log(profile?.response?.email);

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'naver' }] },
    });

    if (exUser) {
      //네이버 사용자의 정보를 로그인 시마다 DB에 update
      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: snsId },
        }
      );
    } else {
      await User.create({
        ...basicInfo,
        sns_id: snsId,
        provider: 'naver',
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: {
        [Op.and]: [
          { sns_id: snsId }, { provider: 'naver' }
        ],
      },
    });

    basicInfo.email = user.email;
    basicInfo.nickname = user.nickname
    basicInfo.user_id = user.user_id;
    basicInfo.user_mbti = user.user_mbti;
    console.log(basicInfo);
    
    //access token 발급
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });

    return [accessToken, refreshToken, basicInfo];
  } catch (error) {
    console.error(error);
  }
};
