const { Board } = require('../../models');

const situationSearchFunc = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await User.findAll({});
    const userCount = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = situationSearchFunc;