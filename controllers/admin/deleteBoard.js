const { User } = require('../../models');
const { Board } = require('../../models');
const { Op } = require("sequelize");

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const { board_id } = req.params;
    
    await Board.destroy({ where: {board_id} })
    console.log('와라 좀')
    res.json({ result: 'success' });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = writeBoardFunc;