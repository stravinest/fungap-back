import * as express from 'express';
import { chatController } from '../controllers';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = express.Router(); // 라우터라고 선언한다.

//챗로그 불러오기
router.get('/chatlog', authenticateJWT, chatController.getChatlog);

export default router;
