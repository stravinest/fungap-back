import * as jwt from 'jsonwebtoken';
import { User } from '../../models';
import { Op } from 'sequelize';
import { LocalProfile, IBasicinfo } from '../../interface/socialLogin';

export const jwtLocalCreate = async (profile: LocalProfile) => {
  const basicInfo: IBasicinfo = {
    user_id: profile?.dataValues?.user_id,
    email: profile?.dataValues?.email,
    nickname: profile?.dataValues?.nickname,
    user_image: profile?.dataValues?.profile_image,
    user_mbti: profile?.dataValues?.user_mbti,
    user_authority: profile?.dataValues?.user_authority,
    provider: profile?.dataValues?.provider,
  };

  const refreshToken = jwt.sign({}, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });

  try {
    console.log(profile?.dataValues?.email);
    await User.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: { email: profile?.dataValues?.email, provider: 'local' },
      }
    );
    console.log('여기 되나요?');

    //access token 발급
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return [accessToken, refreshToken];
  } catch (error) {
    console.error(error);
  }
};
