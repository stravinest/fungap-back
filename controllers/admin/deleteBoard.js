const { User } = require('../../models');
const { Board } = require('../../models');

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const board_id = req.params;

    await Board.update({board_delete_code:1}, { where: board_id });

    res.json({ result: 'success' });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 삭제에 실패했습니다.',
    });
  }
};

module.exports = writeBoardFunc;
