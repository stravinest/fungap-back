const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { Op } = require('sequelize');

exports.jwtGoogleCreate = async (profile) => {
  const basicInfo = {
    email: profile?.email,
    nickname: profile?.name,
    user_image: profile?.picture,
    provider: 'google',
  };
  //refresh token 발급
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: profile?.sub }, { provider: 'google' }] },
    });

    if (exUser) {
      //구글사용자의 정보를 로그인 시마다 DB에 update
      const user_id = exUser.user_id;
      basicInfo.user_id = user_id;
      await User.update(
        {
          ...basicInfo,
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: profile?.sub },
        }
      );
    } else {
      await User.create({
        ...basicInfo,
        sns_id: profile?.sub,
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: profile?.email }, { nickname: profile?.name }],
      },
    });
    const user_id = user.user_id;
    const user_mbti = user.user_mbti;
    basicInfo.user_id = user_id;
    basicInfo.user_mbti = user_mbti;
    //access token 발급
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return [accessToken, refreshToken, basicInfo];
  } catch (error) {
    console.error(error);
  }
};
