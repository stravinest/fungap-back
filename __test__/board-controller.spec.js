const {
  getDetailBoard,
  getBoardHome,
  getSituationBoard,
  changeLike,
} = require('../controllers/board-controller');
describe('getBoardHome', () => {
  const req = {
    userId: 1,
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test('정상적인 유저아이디가 있으면 200응답', async () => {
    await getBoardHome(req, res);

    expect(res.status).toBeCalledWith(200);
  });
  // test('닉네임 중복시 403 응답', async () => {
  //   req.body.email = 'kimyj950113@gmail.com';
  //   await getBoardHome(req, res);
  //   expect(res.status).toBeCalledWith(403);
  // });
  // test('이메일 중복시 403 응답', async () => {
  //   req.body.email = 'yzkim9501@naver.com';
  //   req.body.nickname = 'Pray2';
  //   await getBoardHome(req, res);
  //   expect(res.status).toBeCalledWith(403);
  // });
  // test('테스트용 회원2 생성', async () => {
  //   req.body.email = 'kimyj950113@gmail.com';
  //   await getBoardHome(req, res);
  //   globalUserId2 = res.result.user_id;
  //   expect(res.status).toBeCalledWith(200);
  // });
});
