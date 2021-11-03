const { authenticateJWT } = require('../middlewares/authenticateJWT');
const { checkAuthority } = require('../middlewares/checkAuthority');
const {
  getBoard,
  writeBoard,
  editBoard,
  deleteBoard,
  detailBoard,
  getUser,
} = require('../controllers/admin');

test('정상적인 접근이면 게시물리스트를 200응답과 함께 response', authenticateJWT, checkAuthority, async () => {
    await getBoard(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.result, res.board_list);
})