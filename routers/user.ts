import * as express from 'express';
import request = require('request');
import Validator = require('../middlewares/validator');
import { userController } from '../controllers';
import { getKakaoUser } from '../middlewares/getKakaoUser';
import { getGoogleUser } from '../middlewares/getGoogleUser';
import { getNaverUser } from '../middlewares/getNaverUser';

const router = express.Router(); // 라우터라고 선언한다.

//회원가입
router.post('/signup', Validator('signup'), userController.signup);
//이메일 중복확인
router.post('/email_check', userController.email_check);
//닉네임 중복확인
router.post('/nickname_check', userController.nickname_check);
//로컬 로그인
router.post('/signin', Validator('login'), userController.login);
//카카오 로그인
router.post('/signin/kakao', getKakaoUser, userController.auth);
//구글 로그인
router.post('/signin/google', getGoogleUser, userController.authGoogle);
//네이버 로그인
router.post('/signin/naver', getNaverUser, userController.authNaver);

var app = express();
var client_id = process.env.NAVER_CLIENT_ID;
var client_secret = process.env.NAVER_CLIENT_SECRET;
var state = 'RAMDOM_STATE';
var redirectURI = encodeURI('http://localhost:3000/user/naver/callback');
var api_url = '';
router.get('/naverlogin', function (req, res) {
  api_url =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
    client_id +
    '&redirect_uri=' +
    redirectURI +
    '&state=' +
    state;
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});
router.get('/naver/callback', function (req, res) {
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

export default router;
