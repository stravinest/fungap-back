const { User } = require('../../models');
const { Board } = require('../../models');
const { Op } = require('sequelize');

const editBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const { board_id } = req.params;
    const { board_title, board_image, board_desc, board_content } = req.body;

    await Board.update(
      { board_title, board_image, board_desc, board_content },
      { where: { board_id } }
    );

    res.json({ result: 'success' });
  } catch (err) {
    res.status(400).send({
      msg: '게시글 수정에 실패했습니다.',
    });
  }
};

module.exports = editBoardFunc;
