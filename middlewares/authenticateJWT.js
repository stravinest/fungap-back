const jwt = require('jsonwebtoken');
const { getNewAuth } = require('../utils/renewAuth');
const { loginUser } = require('../utils/setLoginUser');

exports.authenticateJWT = async (req, res, next) => {
  try {
    const [accessToken, refreshToken] = req.headers['authorization'].split(',');

    const iAccessToken = verifyToken(accessToken.split(' ')[1]);
    const irefreshToken = verifyToken(refreshToken);
    console.log(iAccessToken);
    //유효하지 않는 토큰:signature가 맞지 않음
    if (
      iAccessToken === 'invalid signature' ||
      irefreshToken === 'invalid signature'
    ) {
      return res.status(403).json({ ok: false, message: 'invalid token' });
    }

    //잘못된 형식의 토큰
    if (iAccessToken === 'jwt malformed' || irefreshToken === 'jwt malformed') {
      return res.status(403).json({ ok: false, message: 'malformed token' });
    }

    //두토큰다 유효기간이 끝난 겨우
    if (iAccessToken === 'jwt expired' && irefreshToken === 'jwt expired') {
      return res.status(403).json({ ok: false, message: 'invalid token' });
    }

    if (iAccessToken === 'jwt expired') {
      console.log('accessToken Expired!!!');
      if (irefreshToken) {
        const newAuth = await getNewAuth(refreshToken);

        if (!newAuth)
          return res.status(403).json({ ok: false, message: 'invalid token' });

        req.loginUser = loginUser(newAuth.accessToken, refreshToken);
        req.userId = newAuth.userId;
        req.userInfo = {
          userId: newAuth.userId,
          email: newAuth.email,
          nickname: newAuth.nickname,
          user_image: newAuth.user_image,
          provider: 'naver',
        };
        next();
      } else {
        res.json({
          ok: false,
          needsLogin: true,
          message: '로그인이 필요합니다.',
        });
      }
    } else {
      console.log('아아하하하하하');
      console.log(iAccessToken);
      console.log('아아하하하하하');
      req.loginUser = loginUser(accessToken, refreshToken);
      req.userId = iAccessToken.user_id;
      req.userInfo = {
        userId: iAccessToken.user_id,
        email: iAccessToken.email,
        nickname: iAccessToken.nickname,
        user_image: iAccessToken.user_image,
        provider: 'naver',
      };
      next();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

function verifyToken(token) {
  try {
    console.log('아놔좀 나와');
    console.log(token);
    console.log(jwt.verify(token, process.env.JWT_SECRET));
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
