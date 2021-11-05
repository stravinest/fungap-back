const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { Op } = require('sequelize');

exports.jwtKakaoCreate = async (profile) => {
  const basicInfo = {
    email:
      profile.data?.kakao_account?.email ||
      profile.data?.properties.email ||
      '',
    nickname:
      profile.data?.kakao_account?.profile.nickname ||
      profile.data?.properties.nickname,
    user_image:
      profile.data?.kakao_account?.profile.profile_image_url ||
      profile.data?.properties?.profile_image,
    user_mbti:
      profile.data?.kakao_account?.profile.user_mbti ||
      profile.data?.properties.user_mbti,
    provider: 'kakao',
  };

  const snsId = profile.data?.id || profile.id;

  //refresh token 발급
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'kakao' }] },
    });

    if (exUser?.user_delete_code==0) {
      //카카오톡 사용자의 정보를 로그인 시마다 DB에 update
      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: snsId },
        }
      );
    } else if(exUser?.user_delete_code==1) {
      await User.update({
        ...basicInfo,
        sns_id: snsId,
        provider: 'kakao',
        user_delete_code:0,
        refresh_token: refreshToken,
      });
    } else {
      await User.create({
        ...basicInfo,
        sns_id: snsId,
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'kakao' }] },
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
