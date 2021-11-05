const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { Op } = require('sequelize');

exports.jwtGoogleCreate = async (profile) => {
  const basicInfo = {
    email: profile?.email || '',
    nickname: profile?.name || '',
    user_image: profile?.picture || '',
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

    if (exUser?.user_delete_code==1) {
      //구글사용자의 정보를 로그인 시마다 DB에 update
      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: profile?.sub },
        }
      );
    } else if(exUser?.user_delete_code==1) {
      await User.update({
        ...basicInfo,
        sns_id: snsId,
        provider: 'google',
        user_delete_code:0,
        refresh_token: refreshToken,
      });
    } else {
      await User.create({
        ...basicInfo,
        sns_id: profile?.sub,
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: { [Op.and]: [{ sns_id: profile?.sub }, { provider: 'google' }] },
    });
    basicInfo.email = user.email;
    basicInfo.nickname = user.nickname;
    basicInfo.user_id = user.user_id;
    basicInfo.user_mbti = user.user_mbti;
    basicInfo.user_authority = user.user_authority;

    //access token 발급
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return [accessToken, refreshToken, basicInfo];
  } catch (error) {
    console.error(error);
  }
};
