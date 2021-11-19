import * as express from 'express';
const router = express.Router(); // 라우터라고 선언한다.
import * as Validator from '../middlewares/validator';
import { authController } from '../controllers';

//비밀번호재설정 이메일 보내기
router.post('/email', authController.sendEmail);
//비밀번호 재설정
router.patch('/password', Validator('login'), authController.changePassword);
//이메일 인증완료시 호출

export default router;
