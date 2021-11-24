import {Validator} from '../middlewares/validator';
import * as express from 'express';
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

export default router;
