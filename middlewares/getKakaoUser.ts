import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export const getKakaoUser = async (
  req: Request,
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
    res.locals.kakao = profile.data;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
