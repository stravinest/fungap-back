const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
const passport = require('passport');
const { userController } = require('../controllers');
const { getKakaoUser } = require('../middlewares/getKakaoUser');
const { getGoogleUser } = require('../middlewares/getGoogleUser');
const { getNaverUser } = require('../middlewares/getNaverUser');
const app = express();

var client_id = process.env.NAVER_CLIENT_ID;
var client_secret = process.env.NAVER_CLIENT_SECRET;
var state = 'RAMDOM_STATE';
var redirectURI = encodeURI('http://localhost:3000/user/callback');
var api_url = '';
router.get('/naverlogin', function (req, res) {
  api_url =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
    client_id +
    '&redirect_uri=' +
    redirectURI +
    '&state=' +
    state;
  console.log('여기오니?');
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});
router.get('/callback', function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url =
    'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
    client_id +
    '&client_secret=' +
    client_secret +
    '&redirect_uri=' +
    redirectURI +
    '&code=' +
    code +
    '&state=' +
    state;
  var request = require('request');
  var options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//회원가입
router.post('/signup', Validator('signup'), userController.signup);
//이메일 중복확인
router.post('/email_check', Validator('checkEmail'),userController.email_check);
//닉네임 중복확인
router.post('/nickname_check',Validator('checkNickname'), userController.nickname_check);

router.get('/fail', async (req, res, next) => {
  res.status(400).send({ message: '로그인 실패' });
}); //로그인 실패시에

//카카오 로그인
router.post('/signin/kakao', getKakaoUser, userController.auth);
//구글 로그인
router.post('/signin/google', getGoogleUser, userController.authGoogle);
//네이버 로그인
router.post('/signin/naver', getNaverUser, userController.authNaver);
//

//
//
//
//
//
//
//
//

//로컬로그인
router.post(
  '/signin',
  Validator('login'),
  passport.authenticate('local', {
    session: false,
    failureRedirect: '/user/fail',
  }),
  userController.signin
);

//카카오 로그인
//localhost:3000/user/singin/kakao
router.get(
  '/signin/kakao/access',
  passport.authenticate('kakao', {
    session: false, //우리는 세션지원이 필요하지 않음
    failureRedirect: '/user/fail',
  })
);

router.get(
  '/signin/kakao/callback',
  passport.authenticate('kakao'),
  // (req, res) => {
  //   res.redirect('/');
  // },
  userController.kakaoCallback
);

//구글 로그인
router.get(
  '/signin/google/access',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/fail',
    scope: ['profile', 'email'], //google을 통한 인증에는 추가 scope매개변수가 필요범위 매개 변수는 openid 값으로 시작하고 profile 값, email 값 또는 둘 다를 포함해야합니다.
  })
);

router.get(
  '/signin/google/callback',
  passport.authenticate('google'),
  userController.googleCallback
);

module.exports = router;
