import { Op } from 'sequelize';
import { Comment, User } from '../models';
export const getComments = async function (board_id: string) {
  const comments = await Comment.findAll({
    attributes: ['comment', 'board_id', 'comment_id', 'createdAt'],
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
