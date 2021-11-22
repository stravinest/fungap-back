const { Game_comment, User } = require('../models');
const { Op } = require('sequelize');
exports.getComments = async function (game_id) {
  const comments = await Game_comment.findAll({
    attributes: ['game_comment', 'game_id', 'game_comment_id', 'createdAt'],
    where: {
      [Op.and]: { game_comment_delete_code: 0, game_id: game_id },
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
