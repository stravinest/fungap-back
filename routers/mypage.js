const express = require('express');
const Validator = require('../middlewares/validator');
const router = express.Router(); // 라우터라고 선언한다.
const { mypageController } = require('../controllers');
const { authenticateJWT } = require('../middlewares/authenticateJWT');

router.get('/', authenticateJWT, mypageController.getUserInfo);

router.patch(
  '/edit',
  authenticateJWT,
  Validator('userEdit'),
  mypageController.patchUserInfo
);

router.delete('/delete', authenticateJWT, mypageController.deleteUserInfo);

router.get('/liked', authenticateJWT, mypageController.likedBoardList);

module.exports = router;
