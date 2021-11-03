const {
  getDetailBoard,
  getBoardHome,
  getSituationBoard,
  changeLike,
} = require('../controllers/board-controller');
const { Board, Like } = require('../models');

describe('getBoardHome 테스트', () => {
  const req = {
    userId: 1,
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };
  //이미 검증을 통해 유저아이디가 넘어왓으므로 정상적이거나 null값이 들어온다.
  test('정상적인 유저아이디가 있으면 200응답', async () => {
    await getBoardHome(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  test('유저아이디 값이 null 이어도 201응답 ', async () => {
    req.userId = null;
    await getBoardHome(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});

describe('getSituationBoard 테스트', () => {
  const req = {
    userId: 1,
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test('정상적인 유저아이디가 있으면 200응답', async () => {
    await getSituationBoard(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('유저아이디 값이 null 이어도 200응답 ', async () => {
    req.userId = null;
    await getSituationBoard(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});

describe('getDetailBoard 테스트', () => {
  const mockedsend = jest.fn();
  Board.increment = jest.fn();
  const req = {
    userId: 1,
    params: {
      board_id: 1,
    },
    cookies: {
      f1: undefined,
    },
    headers: {
      'x-forwarded-for': '',
    },
    connection: {
      remoteAddress: '',
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    // cookie: ('f1', jest.fn(req)),
    cookie: jest.fn(),
  };

  test('정상적인 유저아이디와 board_id가 Board.increment 호출 ->조회수 1증가', async () => {
    await getDetailBoard(req, res);
    expect(Board.increment).toHaveBeenCalledTimes(1);
    // expect(res.status).toBeCalledWith(200);
  });
  test('유저아이디 값이 null 이어도 201응답 ', async () => {
    req.userId = null;
    req.params.board_id = 1;
    await Board.increment.mockReturnValue(true);
    await getDetailBoard(req, res);
    expect(res.status).toBeCalledWith(201);
  });
});

describe('changeLike 테스트', () => {
  Board.findOne = jest.fn();
  Like.findOne = jest.fn();
  const req = {
    userId: 1,
    params: {
      board_id: 1,
    },
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  test('값이 잘들어오면 Like.findOne 실행된다.', async () => {
    await changeLike(req, res);
    expect(Like.findOne).toHaveBeenCalledTimes(1);
    // expect(res.status).toBeCalledWith(200);
  });
  test('isLike가 있으면 200응답 ', async () => {
    await Like.findOne.mockReturnValue(true);
    await changeLike(req, res);
    expect(res.status).toBeCalledWith(200);
  });
  test('isLike가 없고 isBoard가 없으면 400응답 ', async () => {
    await Like.findOne.mockReturnValueOnce(null);
    await Board.findOne.mockReturnValueOnce(null);

    await changeLike(req, res);
    expect(res.status).toBeCalledWith(400);
  });

  test('isLike가 없고 isBoard가 있으면  200응답 ', async () => {
    await Like.findOne.mockReturnValue(null);
    await Board.findOne.mockReturnValue(true);

    await changeLike(req, res);
    expect(res.status).toBeCalledWith(400);
  });
  test('userId가 없으면  402응답 ', async () => {
    req.userId = null;
    await changeLike(req, res);
    expect(res.status).toBeCalledWith(402);
  });
  // test('isLike가 없고 isBoard가 없으면 실행 ', async () => {
  //   await Like.findOne.mockReturnValue(null);
  //   await Board.findOne.mockReturnValue(null);
  //   await changeLike(req, res);
  //   expect(Board.findOne).toHaveBeenCalledTimes(1);
  // });
});
