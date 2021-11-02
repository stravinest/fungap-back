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
            { email: profile?.response?.email },
            { nickname: profile?.response?.nickname },
          ],
        },
      });
      const user_id = user.user_id;
      basicInfo.user_id = user_id;
      //access token 발급
      const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE,
      });
      return [accessToken, refreshToken];
    } catch (error) {
      console.error(error);
    }
  };