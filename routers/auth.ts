import * as express from 'express';
import { authController } from '../controllers';
const router = express.Router();
import { Validator } from '../middlewares/validator';

//비밀번호재설정 이메일 보내기
router.post('/email', authController.sendEmail);
//비밀번호 재설정
router.patch('/password', Validator('login'), authController.changePassword);

export default router;
