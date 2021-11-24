import * as express from 'express';
import { mbtiController } from '../controllers';
const router = express.Router(); // 라우터라고 선언한다.

//유명인mbti검색
// router.post('/celebrity', mbtiController.mbtiCelebrity);

//mbti궁합 검색
router.post('/test', mbtiController.mbtiTest);

export default router;
