const express = require('express');
const router = express.Router(); 

const {authenticateJWT} = require('../middlewares/authenticateJWT');
const {checkAuthority} = require('../middlewares/checkAuthority');
const { getBoard, writeBoard, editBoard, deleteBoard, detailBoard, getUser } = require('../controllers/admin');

router.get('/board', authenticateJWT, checkAuthority, getBoard);
router.post('/board/write', authenticateJWT, checkAuthority, writeBoard);
router.patch('/board/:board_id/edit', authenticateJWT, checkAuthority, editBoard);
router.delete('/board/:board_id/delete', authenticateJWT, checkAuthority, deleteBoard);
router.get('/board/:board_id/detail', authenticateJWT, checkAuthority, detailBoard);
router.get('/user', authenticateJWT, checkAuthority, getUser);

module.exports = router;