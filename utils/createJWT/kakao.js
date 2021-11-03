const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { Op } = require('sequelize');

exports.jwtKakaoCreate = async (profile) => {
  const basicInfo = {
    email: profile.data?.kakao_account?.email || profile.data?.properties.email,
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

    if (exUser) {
      //카카오톡 사용자의 정보를 로그인 시마다 DB에 update
      const user_id = exUser.user_id;
      basicInfo.user_id = user_id;
      await User.update(
        {
          ...basicInfo,
          refresh_token: refreshToken,
<<<<<<< HEAD
        });
      }
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: profile.data?.kakao_account?.email || profile.data?.properties.email, },
            { nickname:
              profile.data?.kakao_account?.profile.nickname ||
              profile.data?.properties.nickname, },
          ],
=======
>>>>>>> 1c618ba02abac32de291482a0c3e0f9d74cd3c5c
        },
        {
          where: { sns_id: snsId },
        }
      );
    } else {
      await User.create({
        ...basicInfo,
        sns_id: snsId,
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email:
              profile.data?.kakao_account?.email ||
              profile.data?.properties.email,
          },
          {
            nickname:
              profile.data?.kakao_account?.profile.nickname ||
              profile.data?.properties.nickname,
          },
        ],
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
