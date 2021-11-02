const { Board, Like, sequelize, Sequelize } = require('../models');
const { Op } = require('sequelize');
const {
  situationBoardLogin, //로그인시
  situationBoard, //비로그인
  detailCommentsAll, //로그인비로그인시 댓글
  detailBoard, //비로그인 상세 게시글
  detailBoardLogin, //로그인 상세 게시글
  PopBoardHome,
  NewBoardHome,
  NewBoardHomeLogin,
  PopBoardHomeLogin,
} = require('../utils/getQuery');
//홈화면 조회
const getBoardHome = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const new_board_list = await NewBoardHomeLogin(user_id);
      const popularity_board_list = await PopBoardHomeLogin(user_id);
      res
        .status(200)
        .json({ result: 'success', new_board_list, popularity_board_list });
    } else {
      const new_board_list = await NewBoardHome();
      const popularity_board_list = await PopBoardHome();
      res
        .status(200)
        .json({ result: 'success', new_board_list, popularity_board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

//상황별 페이지 게시글 전체 조회
const getSituationBoard = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const board_list = await situationBoardLogin(user_id);

      res.status(200).json({ result: 'success', board_list });
    } else {
      const board_list = await situationBoard();

      res.status(200).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

// 게시글 디테일페이지 조회
const getDetailBoard = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    const { board_id } = req.params;

    if (req.cookies['f' + board_id] == undefined) {
      res.cookie('f' + board_id, getUserIP(req), {
        maxAge: 720000, //12분
        // maxAge: 1200000,
      });
      await Board.increment({ view_count: +1 }, { where: { board_id } });
    }

    if (user_id) {
      const result = await detailBoardLogin(user_id, board_id);
      const comments = await detailCommentsAll(board_id);
      const board = result[0];
      res.status(200).json({ result: 'success', board, comments });
    } else {
      const result = await detailBoard(board_id);
      const comments = await detailCommentsAll(board_id);
      const board = result[0];
      res.status(200).json({ result: 'success', board, comments });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

function getUserIP(req) {
  const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return addr;
}

//좋아요 /좋아요 취소
const changeLike = async (req, res) => {
  try {
    const user_id = req.userId;
    const { board_id } = req.params;
    console.log('유저로그인', user_id);
    if (user_id) {
      const isLike = await Like.findOne({
        where: {
          [Op.and]: { board_id: board_id, user_id: user_id },
        },
      });
      //isLike 가 있으면 delete 없으면 create
      if (isLike) {
        await Like.destroy({
          where: {
            [Op.and]: { board_id: board_id, user_id: user_id },
          },
        });
        res.status(200).json({ result: 'success', like_state: false });
      } else {
        await Like.create({
          user_id: user_id,
          board_id: board_id,
        });
        res.status(200).json({ result: 'success', like_state: true });
      }
    } else {
      res.status(400).json({ result: 'fail', msg: '로그인이 필요합니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '좋아요 변경 실패';
    });
  }
};
module.exports = {
  getDetailBoard,
  getBoardHome,
  getSituationBoard,
  changeLike,
};
