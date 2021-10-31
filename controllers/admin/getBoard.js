const { User } = require('../../models');
const { Board } = require('../../models');

const getBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({ where: userId });

    const board = await Board.findAll({});

    res.json({ result: 'success', board_list: board });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getBoardFunc;
