const { User } = require('../../models');
const { Board } = require('../../models');
const { Op } = require('sequelize');

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const { board_id } = req.params;

    const board = await Board.findOne({ where: {board_id} });

    res.json({ result: 'success', board });
  } catch (err) {
    res.status(400).send({
      msg: '게시글 상세를 불러오는데 실패했습니다.',
    });
  }
};

module.exports = writeBoardFunc;
