const {
  Board,
  User,
  Like,
  Comment,
  sequelize,
  Sequelize,
} = require('../models');
const { Op } = require('sequelize');
// const { getUserIP } = require('../utils/getUserIp');
//홈화면 조회
const getBoardHome = async (req, res) => {
  try {
    const newBoard = await Board.findAll({
      limit: 4,
      order: [['createdAt', 'DESC']],
    });

    const popularityBoard = await Board.findAll({
      limit: 4,
      order: [['like_count', 'DESC']],
    });

    const addLike = [];

    const postQuery = `
    SELECT b.board_id,  b.board_content, count(l.board_id) as likeCnt
    FROM database_final_project.boards AS b
    LEFT OUTER JOIN database_final_project.likes AS l
    ON b.board_id = l.board_id
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC`;

    const posts = await sequelize.query(postQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log(posts);

    const poplike = [];
    for (let i = 0; i < popularityBoard.length; i++) {
      console.log(popularityBoard[i]['dataValues'].board_id);
      const islike = await Like.findOne({
        where: { board_id: popularityBoard[i]['board_id'] },
      });
      poplike.push(popularityBoard[i]['dataValues']);
      console.log(i);
      if (islike) {
        poplike[i].like_state = true;
      } else {
        poplike[i].like_state = false;
      }
    }

    // console.log(addLike);
    res.status(200).json({ result: 'success', newBoard, popularityBoard });
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

// 게시글 디테일페이지 조회
const getDetailBoard = async (req, res) => {
  try {
    const user_id = 1; //임의로 설정
    const { board_id } = req.params;

    if (req.cookies['f' + board_id] == undefined) {
      res.cookie('f' + board_id, getUserIP(req), {
        maxAge: 720000, //12분
        // maxAge: 1200000,
      });
      await Board.increment({ view_count: +1 }, { where: { board_id } });
    }

    //query로
    const queryBoard = `
    SELECT b.board_title,b.board_image,b.board_content,b.view_count,count(l.board_id) as like_count,
    CASE u.board_id
    WHEN b.board_id THEN 'true'
    ELSE 'false'
    END AS like_state
    FROM boards AS b
    left OUTER JOIN comments AS c
    ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    left OUTER JOIN likes AS u
    ON b.board_id = u.board_id AND u.user_id=${user_id}
    WHERE (b.board_delete_code = 0 AND b.board_id=${board_id})
    `;
    const result = await sequelize.query(queryBoard, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const queryComment = `
    SELECT u.user_image,u.user_id,c.board_id,u.user_mbti,u.nickname,c.comment,c.comment_id
    FROM comments AS c
    left OUTER JOIN users AS u
    ON c.user_id = u.user_id
    WHERE (c.comment_delete_code = 0 ANd c.board_id=${board_id})
    ORDER BY c.createdAt DESC`;

    const comments = await sequelize.query(queryComment, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const board = result[0];
    res.status(200).json({ result: 'success', board, comments });
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
    const user_id = null; //임의로 설정

    if (user_id) {
      //query로
      const query = `
    SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
    CASE u.board_id 
    WHEN b.board_id THEN 'true'
    ELSE 'false'
    END AS like_state
    FROM boards AS b
    left OUTER JOIN comments AS c
    ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    left OUTER JOIN likes AS u
    ON b.board_id = u.board_id AND u.user_id=${user_id}
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC`;

      const board_list = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      res.status(200).json({ result: 'success', board_list });
    } else {
      const query = `
      SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
      CASE l.board_id 
      WHEN '말이안되는값' THEN 'true'
      ELSE 'false'
      END AS like_state
      FROM boards AS b
      left OUTER JOIN comments AS c
      ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
      left OUTER JOIN likes AS l
      ON b.board_id = l.board_id
      WHERE b.board_delete_code = 0
      GROUP BY b.board_id
      ORDER BY b.createdAt DESC`;

      const board_list = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });

      res.status(200).json({ result: 'success', board_list });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '게시글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//좋아요 /좋아요 취소
const changeLike = async (req, res) => {
  try {
    const user_id = 1;
    const { board_id } = req.params;
    console.log(board_id);
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
