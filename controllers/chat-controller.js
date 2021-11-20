const { User, Chatlog, sequelize, Sequelize } = require('../models');

const getChatlog = async (req, res) => {
  try {
    const { roomname } = req.query;
    console.log(roomname);
    const query = `SELECT c.chat_id, c.room_name, u.user_id, u.nickname, u.user_image, c.message , c.createdAt
    FROM users AS u
    LEFT OUTER JOIN chatlogs AS c
    ON (u.user_id = c.user_id)
    WHERE c.room_name = '${roomname}'
    ORDER BY c.chat_id ASC`;

    const chatlogs = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({
      result: 'success',
      chatlogs,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

module.exports = { getChatlog };
