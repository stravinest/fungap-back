const {
  Board,
  Comment,
  User,
  Like,
  sequelize,
  Sequelize,
} = require('../models');
const { Op } = require('sequelize');

//댓글조회
const getComment = async (req, res) => {
  try {
    const { board_id } = req.params;
    console.log(board_id);
    const result = await Comment.findAll({
      attributes: ['comment', 'board_id', 'comment_id'],
      where: {
        [Op.and]: { comment_delete_code: 0, board_id: board_id },
      },
      include: [
        {
          model: User,
          attributes: ['user_image', 'user_id', 'user_mbti', 'nickname'],
        },
        // { model: likes },
      ],
      order: [['createdAt', 'DESC']],
    });
    console.log(result[0].dataValues);

    // const result = await Comment.findAll({
    //   where: {
    //     [Op.and]: { userId, isCompleted },
    //   },
    //   include: {
    //     model: Challenge,
    //     as: 'Challenge',
    //     attributes: [
    //       'challengeName',
    //       'challengeIntroduce',
    //       'challengeDateTime',
    //       'communityNickname',
    //       'progressStatus',
    //     ],
    //     where,
    //   },
    //   order: [[Challenge, 'challengeDateTime', 'ASC']],
    // });
    // console.log(result);
    //
    // //query로
    // const query = `
    // SELECT u.user_image,u.user_id,c.board_id,u.user_mbti,u.nickname,c.comment,c.comment_id
    // FROM comments AS c
    // INNER JOIN users AS u
    // ON c.user_id = u.user_id
    // WHERE c.board_id = ${board_id}
    // ORDER BY c.createdAt DESC`;

    // const comments = await sequelize.query(query, {
    //   type: Sequelize.QueryTypes.SELECT,
    // });
    // console.log(comments);

    res.status(200).json({ result: 'success', result });
  } catch (error) {
    console.error(error);
    res.status(400).json(() => {
      msg: '댓글 목록을 불러오는데 실패하였습니다.';
    });
  }
};
//댓글등록
const postComment = async (req, res) => {
  try {
    const user_id = 1; //임의로 user_id 1이 로그인 하였음
    const { board_id } = req.params;
    const { comment } = req.body;
    console.log(board_id);
    console.log(comment);

    await Comment.create({
      user_id: user_id,
      board_id: board_id,
      comment: comment,
    });
    res.status(200).json({ result: 'success' });
  } catch (error) {
    console.error(error);
    res.status(401).json(() => {
      msg: '댓글 등록실패하였습니다.';
    });
  }
};
//댓글삭제
const deleteComment = async (req, res) => {
  try {
    const user_id = 1; //임의로 user_id 1이 로그인 하였음
    const { board_id, comment_id } = req.params;

    console.log(board_id, comment_id);

    await Comment.update(
      //del code 숫자 수정
      {
        comment_delete_code: 1,
      },
      {
        where: { board_id: board_id, comment_id: comment_id, user_id: user_id },
      }
    );
    res.status(200).json({ result: 'success' });
  } catch (error) {
    console.error(error);
    res.status(401).json(() => {
      msg: '댓글 삭제 실패하였습니다.';
    });
  }
};
//댓글수정
const patchComment = async (req, res) => {
  try {
    const user_id = 1; //임의로 user_id 1이 로그인 하였음
    const { board_id, comment_id } = req.params;
    const { comment } = req.body;
    console.log(board_id, comment_id);

    await Comment.update(
      {
        comment: comment,
      },
      {
        where: { board_id: board_id, comment_id: comment_id, user_id: user_id },
      }
    );
    res.status(200).json({ result: 'success' });
  } catch (error) {
    console.error(error);
    res.status(401).json(() => {
      msg: '댓글 수정 실패하였습니다.';
    });
  }
};
module.exports = {
  deleteComment,
  postComment,
  getComment,
  patchComment,
};
