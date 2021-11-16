import * as jwt from 'jsonwebtoken';
import User from '../models/user';

const getNewAuth = async function (refresh_token: string) {
  console.log('새로 accesstoken 발급');
  const info = await User.findOne({
    attributes: ['user_id', 'email', 'nickname', 'user_image', 'provider'],
    where: { refresh_token },
  });

  if (info) {
    const basicInfo = {
      userId: info.user_id,
      email: info.email,
      nickname: info.nickname,
      user_image: info.user_image,
      provider: info.provider,
    };
    console.log(basicInfo);
    const accessToken = jwt.sign(basicInfo, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return {
      accessToken,
      userId: info.user_id,
      email: info.email,
      nickname: info.nickname,
      user_image: info.user_image,
      provider: info.provider,
    };
  }
  return null;
};

export default getNewAuth;
