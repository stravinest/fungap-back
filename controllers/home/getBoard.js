const { like } = require('../../models');
const { Board } = require('../../models');
const { sequelize } = require('../../models/board');

const getBoardFunc = async (req, res) => {
  try {
    const new_board_list = await Board.findAll({limit:5, order: [['createdAt']]});
    const popularity_board_list = await Board.findAll({limit:5, include:[{model:like, attributes:[[sequelize.fn('COUNT', 'user_id'), 'like_Count']]}]});
        
    res.json({ result: 'success', new_board_list, popularity_board_list });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getBoardFunc;
