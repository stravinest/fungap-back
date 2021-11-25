import * as express from 'express';
//Validator 처리법 생각해야 한다.

const router = express.Router(); // 라우터라고 선언한다.

import { mypageController } from '../controllers';
import authenticateJWT from '../middlewares/authenticateJWT';

//유저정보 조회
router.get('/', authenticateJWT, mypageController.getUserInfo);

//유저정보 수정
router.patch('/edit', authenticateJWT, mypageController.patchUserInfo);

//유저정보 삭제
router.delete('/delete', authenticateJWT, mypageController.deleteUserInfo);

//유저가 좋아요한 게시글 조회
router.get('/liked', authenticateJWT, mypageController.likedBoardList);

export default router;
