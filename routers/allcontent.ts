import * as express from 'express';
import { allContentController } from '../controllers';
const router = express.Router();

//둘러보기 페이지
router.get('/', allContentController.allContent);

export default router;
