const { User } = require('../../models');
const { Board, Comment,Like } = require('../../models');
const { Op } = require('sequelize');
const { sequelize } = require('../../models/board');

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const board_id = req.params;

    const board = await Board.findOne({ 
      where: board_id, 
      include: [{model:Comment}, {model:Like, attributes: ['user_id']}]
      
    });

    res.json({ result: 'success', board });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 상세를 불러오는데 실패했습니다.',
    });
  }
};

module.exports = writeBoardFunc;
