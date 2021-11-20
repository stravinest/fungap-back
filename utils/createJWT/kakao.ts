import * as jwt from 'jsonwebtoken';
import { User } from '../../models';
import { Op } from 'sequelize';
import { KakaoProfile } from '../../interface/socialLogin';

export const jwtKakaoCreate = async (profile: KakaoProfile) => {
  const basicInfo: object = {
    email: profile.data?.kakao_account?.email || '',
    nickname: profile.data?.properties.nickname,
    user_image: profile.data?.properties?.profile_image,
    user_mbti: undefined,
    provider: 'kakao',
  };

  const snsId: string = profile.data?.id || profile.id;

  //refresh token 발급
  const refreshToken: string = jwt.sign({}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'kakao' }] },
    });

    if (exUser?.user_delete_code == 0) {
      //카카오톡 사용자의 정보를 로그인 시마다 DB에 update
      await User.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: { sns_id: snsId },
        }
      );
    } else if (exUser?.user_delete_code == 1) {
      await User.update(
        {
          ...basicInfo,
          sns_id: snsId,
          provider: 'kakao',
          user_delete_code: 0,
          refresh_token: refreshToken,
        },
        {
          where: {
            [Op.and]: [{ sns_id: snsId }, { provider: 'kakao' }],
          },
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
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'kakao' }] },
    });

    const updateBasicInfo: object = {
      nickname: user?.nickname,
      email: user?.email,
      user_id: user?.user_id,
      user_mbti: user?.user_mbti,
      user_authority: user?.user_authority,
      user_image: user?.user_image,
    };

    Object.assign(basicInfo, updateBasicInfo);

    //access token 발급
    const accessToken: string = jwt.sign(basicInfo, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return [accessToken, refreshToken, basicInfo];
  } catch (error) {
    console.error(error);
  }
};
