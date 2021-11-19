import * as jwt from 'jsonwebtoken';
import { User } from '../../models';
import { Op } from 'sequelize/types';
import { NaverProfile } from '../../interface/socialLogin';

export const jwtNaverCreate = async (profile: NaverProfile) => {
  const basicInfo: object = {
    email: profile?.response?.email,
    nickname: profile?.response?.nickname,
    user_image: profile?.response?.profile_image,
    provider: 'naver',
  };

  const snsId: string = profile?.response?.id;

  //refresh token 발급
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
  console.log(profile?.response?.email);

  try {
    const exUser = await User.findOne({
      where: { [Op.and]: [{ sns_id: snsId }, { provider: 'naver' }] },
    });
    console.log(exUser?.user_delete_code, '오오오');

    if (exUser?.user_delete_code == 0) {
      //네이버 사용자의 정보를 로그인 시마다 DB에 update
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
          provider: 'naver',
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
        provider: 'naver',
        refresh_token: refreshToken,
      });
    }
    const user = await User.findOne({
      where: {
        [Op.and]: [{ sns_id: snsId }, { provider: 'naver' }],
      },
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
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });

    return [accessToken, refreshToken, basicInfo];
  } catch (error) {
    console.error(error);
  }
};
