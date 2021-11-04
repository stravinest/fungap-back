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
    const isBoard = await Board.findOne({ where: { board_id: board_id } });
    if (!isBoard) {
      res.status(401).json({
        result: 'fail',
        errormessage: '게시글이 없습니다.',
      });
      return;
    }
    const comments = await Comment.findAll({
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
    if (!comments[0]) {
      console.log('왜여기안걸려?');
      res
        .status(200)
        .json({ comments: 'fail', errormessage: '댓글이 없습니다.' });
      return;
    }
    console.log('resutl는', comments);
    console.log(comments[0].dataValues);

    res.status(200).json({ result: 'success', comments });
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
    const user_id = req.userId; //임의로 user_id 1이 로그인 하였음
    const { board_id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      console.log('커멘트 없음');
      res.status(400).json({ result: 'fail', errormessage: '내용입력하세요' });
      return;
    }

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
    const user_id = req.userId;
    const { board_id, comment_id } = req.params;
    const isComment = await Comment.findOne({
      //내가 쓴 comment 인지 확인
      where: { board_id: board_id, comment_id: comment_id, user_id: user_id },
    });
    if (isComment) {
      console.log(isComment);
      if (isComment.comment_delete_code !== 1) {
        //삭제 된게 아니면
        // //내가 쓴 comment 이면 수정가능
        await Comment.update(
          //del code 숫자 수정
          {
            comment_delete_code: 1,
          },
          {
            where: {
              board_id: board_id,
              comment_id: comment_id,
              user_id: user_id,
            },
          }
        );
        res.status(200).json({ result: 'success' });
      } else {
        res
          .status(401)
          .json({ result: 'fail', errormessage: '이미 삭제되었습니다.' });
      }
    } else {
      //내가쓴게 아니므로//내가 쓴게 아니거나 커멘트가 없거나

      res.status(401).json({
        result: 'false',
        errormessage: '삭제할수 없는 comment입니다.',
      });
    }
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
    const user_id = req.userId; //임의로 user_id 1이 로그인 하였음
    const { board_id, comment_id } = req.params;
    const { comment } = req.body;
    console.log(board_id, comment_id);
    const isComment = await Comment.findOne({
      //내가 쓴 comment 인지 확인
      where: { board_id: board_id, comment_id: comment_id, user_id: user_id },
    });
    if (isComment) {
      //내가 쓴게 맞으면
      console.log(isComment);
      if (isComment.comment_delete_code !== 1) {
        //삭제 된게 아니면

        await Comment.update(
          {
            comment: comment,
          },
          {
            where: {
              board_id: board_id,
              comment_id: comment_id,
              user_id: user_id,
            },
          }
        );
        res.status(200).json({ result: 'success' });
      } else {
        res
          .status(401)
          .json({ result: 'fail', errormessage: '이미삭제되었습니다.' });
      }
    } else {
      //내가 쓴게 아니면
      res
        .status(401)
        .json({ result: 'fail', errormessage: '수정할수없는 comment입니다.' });
    }
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
