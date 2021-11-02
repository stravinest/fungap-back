const { User } = require('../../models');
const { Board } = require('../../models');
const { Op } = require('sequelize');

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const { board_id } = req.params;

    await Board.destroy({ where: { board_id } });

    res.json({ result: 'success' });
  } catch (err) {
    res.status(400).send({
      msg: '게시글 삭제에 실패했습니다.',
    });
  }
};

module.exports = writeBoardFunc;
