const { User } = require('../../models');
const { Comment } = require('../../models');

const getCommentFunc = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log(user_id);
    const users = await User.findOne({
      where: user_id,
      include: [{ model: Comment}],
    });
    console.log(users.Comments);
    console.log(users.countComments());
    const userCount = await User.count({});

    res.json({ result: 'success', users, userCount });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getCommentFunc;
