const express = require('express');
const router = express.Router(); 

const checkUserInfo = require('../middlewares/authenticateJWT');
const checkAuthority = require('../middlewares/checkAuthority');
const { getBoard, writeBoard, editBoard, deleteBoard, detailBoard } = require('../controllers/admin');

router.get('/board', checkUserInfo, checkAuthority, getBoard);
router.post('/board/write', checkUserInfo, checkAuthority, writeBoard);
router.patch('/board/:board_id/edit', checkUserInfo, checkAuthority, editBoard);
router.delete('/board/:board_id/delete', checkUserInfo, checkAuthority, deleteBoard);
router.get('/board/:board_id/detail', checkUserInfo, checkAuthority, detailBoard);

module.exports = router;