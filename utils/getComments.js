const { Comment, User } = require('../models');
const { Op } = require('sequelize');
exports.getComments = async function (board_id) {
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
  return comments;
};
