const { jwtKakaoCreate } = require('./kakao');
const { jwtGoogleCreate } = require('./google');
const { jwtNaverCreate } = require('./naver');
const { jwtLocalCreate } = require('./local');

module.exports = {
  jwtKakaoCreate,
  jwtGoogleCreate,
  jwtNaverCreate,
  jwtLocalCreate,
};
