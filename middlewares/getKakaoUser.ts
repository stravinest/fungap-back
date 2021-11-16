import axios from 'axios';
import { NextFunction, Response } from 'express';
import { KakaoReq } from '../interface/socialLogin';

exports.getKakaoUser = async (
  req: KakaoReq,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.body;
  console.log(access_token);

  try {
    const Authorization = `Bearer ${access_token}`;
    const profile = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me?secure_resource=true',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization,
      },
    });
    console.log(profile);
    req.kakao = profile.data;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
