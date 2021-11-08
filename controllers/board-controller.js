const { Board, Like, sequelize, Sequelize } = require('../models');
const { Op } = require('sequelize');
const {
  PopBoardHome,
  NewBoardHome,
  NewBoardHomeLogin,
  PopBoardHomeLogin,

  situationBoardLogin, //최신순로그인시
  situationBoard, //최신순비로그인
  situationBoardPopLogin, //인기순 로그인
  situationBoardPop, //인기순 비로그인
  situationBoardViewLogin, //조회순 로그인
  situationBoardView, //조회순 비로그인

  detailCommentsAll, //로그인비로그인시 댓글
  detailBoard, //비로그인 상세 게시글
  detailBoardLogin, //로그인 상세 게시글
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
        .status(201)
        .json({ result: 'success', new_board_list, popularity_board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//상황별 페이지 게시글 전체 조회(최신순)(test)
const getSituationBoardTest = async (req, res) => {
  try {
    //1,2,3,4,5,6,7 page 1일때
    const { page } = req.query;
    console.log(page);
    const perPage = 3;
    const allPage = page * perPage;
    const pageNum = parseInt(page, 10);
    console.log(pageNum);
    let start_num = 0;
    let last_num = 0;
    if (pageNum === 1) {
      start_num = 0;
      last_num = 3;
    } else {
      (start_num = (pageNum - 1) * perPage), //3
        (last_num = pageNum * perPage);
    }

    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      //로그인시

      const allboard_list = await situationBoardLogin(user_id);
      console.log(allboard_list.length);

      if (allboard_list.length < allPage) {
        last_num = allboard_list.length;
      }
      const board_list = [];
      for (let i = start_num; i < last_num; i++) {
        board_list.push(allboard_list[i]);
      }

      res.status(200).json({ result: 'success', board_list });
    } else {
      //비로그인시
      const board_list = await situationBoard();

      res.status(201).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

//상황별 페이지 게시글 전체 조회(최신순)
const getSituationBoard = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      //로그인시
      const board_list = await situationBoardLogin(user_id);

      res.status(200).json({ result: 'success', board_list });
    } else {
      //비로그인시
      const board_list = await situationBoard();

      res.status(201).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//상황별 페이지 게시글 전체 조회(인기순)
const getSituationBoardPop = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      //로그인시
      const board_list = await situationBoardPopLogin(user_id);

      res.status(200).json({ result: 'success', board_list });
    } else {
      //비로그인시
      const board_list = await situationBoardPop();

      res.status(201).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//상황별 페이지 게시글 전체 조회(조회순)
const getSituationBoardView = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);

    if (user_id) {
      const board_list = await situationBoardViewLogin(user_id);

      res.status(200).json({ result: 'success', board_list });
    } else {
      const board_list = await situationBoardView();

      res.status(201).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

// 게시글 디테일페이지 조회
const getDetailBoard = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log('유저로그인', user_id);
    const { board_id } = req.params;
    console.log(req.cookies);
    if (req.cookies['f' + board_id] == undefined) {
      res.cookie('f' + board_id, getUserIP(req), {
        maxAge: 720000, //12분
        // maxAge: 1200000,
      });
      await Board.increment({ view_count: +1 }, { where: { board_id } });
    }

    if (user_id) {
      const beforetime = await Date.now();
      await console.log(Date.now());
      const result = await detailBoardLogin(user_id, board_id);
      const comments =
        (await detailCommentsAll(board_id)) +
        (await console.log(Date.now() - beforetime));

      const board = result[0];
      res.status(200).json({ result: 'success', board, comments });
    } else {
      console.log('여기일텐데??');
      const result = await detailBoard(board_id);
      const comments = await detailCommentsAll(board_id);
      const board = result[0];
      res.status(201).json({ result: 'success', board, comments });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormesssage: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};

function getUserIP(req) {
  console.log(req.headers);
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
        const isBoard = await Board.findOne({
          //찍고자하는 게시물이 있는지 검사
          where: {
            board_id: board_id,
          },
        });

        if (isBoard === null) {
          res
            .status(400)
            .json({ result: 'fail', errormessage: '게시글이 없습니다.' });
          return;
        }
        await Like.create({
          user_id: user_id,
          board_id: board_id,
        });
        res.status(200).json({ result: 'success', like_state: true });
      }
    } else {
      console.log('여기로 안들어와?');
      res.status(402).json({ result: 'fail', msg: '로그인이 필요합니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      result: 'fail';
      errormessage: '좋아요 변경 실패';
    });
  }
};
module.exports = {
  getDetailBoard,
  getBoardHome,
  getSituationBoardView,
  getSituationBoardPop,
  getSituationBoard,
  changeLike,
  getSituationBoardTest, //test
};
