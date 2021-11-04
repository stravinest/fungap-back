const { User } = require('../../models');
const { Board, Like } = require('../../models');

const getBoardFunc = async (req, res) => {
  try {
    const user_id = req.userId;
    const userInfo = await User.findOne({ where: user_id });
        
    const board = await Board.findAll({
      include: [Like],
    });
    console.log(board.Like);
    res.status(200).json({ result: 'success', board_list: board });
  } catch (err) {
    res.status(400).json({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getBoardFunc;
