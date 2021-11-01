const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
const { mypageController } = require('../controllers');
const { getKakaoUser } = require('../middlewares/getKakaoUser');
const { getGoogleUser } = require('../middlewares/getGoogleUser');
const { getNaverUser } = require('../middlewares/getNaverUser');
const {authenticateJWT} = require('../middlewares/authenticateJWT');
const {checkAuthority} = require('../middlewares/checkAuthority');

router.get('/', authenticateJWT, checkAuthority, mypageController.getUserInfo);
router.patch('/edit',authenticateJWT ,checkAuthority, mypageController)

router.post('/board/write', authenticateJWT, checkAuthority, writeBoard);
router.patch('/board/:board_id/edit', authenticateJWT, checkAuthority, editBoard);
router.delete('/board/:board_id/delete', authenticateJWT, checkAuthority, deleteBoard);
router.get('/board/:board_id/detail', authenticateJWT, checkAuthority, detailBoard);

router.post('/', mypageController.signup);

module.exports = router;
