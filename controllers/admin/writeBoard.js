const { User } = require('../../models');
const { Board } = require('../../models');

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const { board_title, board_image, board_desc, board_content } = req.body;

    await Board.create({
      user_id: userId,
      board_title,
      board_image,
      board_desc,
      board_content,
    });

    res.json({ result: 'success' });
  } catch (err) {
    res.status(400).send({
      msg: '게시글 작성에 실패했습니다.',
    });
  }
};

module.exports = writeBoardFunc;
