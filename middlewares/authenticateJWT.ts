import * as jwt from 'jsonwebtoken';
import getNewAuth from '../utils/renewAuth';
import loginUser from '../utils/setLoginUser';
import { Request, Response, NextFunction } from 'express';

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [accessToken, refreshToken] =
      req.headers['authorization']!.split(',');

    const iAccessToken = verifyToken(accessToken.split(' ')[1]);
    const irefreshToken = verifyToken(refreshToken);
    console.log(iAccessToken);
    console.log(irefreshToken);
    //유효하지 않는 토큰:signature가 맞지 않음
    if (
      iAccessToken === 'invalid signature' ||
      irefreshToken === 'invalid signature'
    ) {
      return res.status(403).json({ result: 'fail', error: 'invalid token' });
    }

    //잘못된 형식의 토큰
    if (iAccessToken === 'jwt malformed' || irefreshToken === 'jwt malformed') {
      return res.status(403).json({ result: 'fail', error: 'malformed token' });
    }

    //두토큰다 유효기간이 끝난 경우
    if (iAccessToken === 'jwt expired' && irefreshToken === 'jwt expired') {
      return res.status(403).json({ result: 'fail', error: 'invalid token' });
    }

    //액세스토큰 만료 리플레쉬 살아있음
    if (iAccessToken === 'jwt expired') {
      console.log('accessToken Expired!!!');
      if (irefreshToken) {
        console.log(refreshToken);
        console.log(irefreshToken);
        const newAuth = await getNewAuth(refreshToken);

        if (!newAuth)
          return res
            .status(403)
            .json({ result: 'fail', error: 'invalid token' });
        res.locals.loginUser = loginUser(newAuth.accessToken, refreshToken);
        res.locals.userId = newAuth.userId;
        res.locals.userInfo = {
          userId: newAuth.userId,
          email: newAuth.email,
          nickname: newAuth.nickname,
          user_image: newAuth.user_image,
          provider: newAuth.provider,
        };
        next();
      } else {
        res.json({
          result: 'fail',
          needsLogin: true,
          message: '로그인이 필요합니다.',
        });
      }
    } else {
      console.log('둘다 만료되지 않은 토큰입니다.굳굳');

      res.locals.loginUser = loginUser(accessToken, refreshToken);
      res.locals.userId = iAccessToken.user_id;
      res.locals.userInfo = {
        userId: iAccessToken.user_id,
        email: iAccessToken.email,
        nickname: iAccessToken.nickname,
        user_image: iAccessToken.user_image,
        provider: iAccessToken.provider,
      };
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({
      result: 'fail',
      message: '로그인이 필요합니다.',
    });
    next(error);
  }
};

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error: any) {
    //애니는 용납 못해@@@@@@@@ 에러핸들러 상의해서 만들고 에러 타입스 라이브러리 알아보기@@@@@@@@
    console.error(error);
    return error.message;
  }
}

export default authenticateJWT;
