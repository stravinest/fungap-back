const { User } = require('../../models');
const { Board } = require('../../models');
const { Op } = require("sequelize");

const writeBoardFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const board_id = req.params;
    const { title, image_url, content } = req.body;
    
    await Board.update({ board_id }, {where: { board_title: title, board_image: image_url, board_content: content }})
    
    res.json({ result: 'success' });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = writeBoardFunc;