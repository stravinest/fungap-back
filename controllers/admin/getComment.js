const { User } = require('../../models');
const { Comment, Like } = require('../../models');
const { Op } = require('sequelize');

const getCommentFunc = async (req, res) => {
  try {
    const user_id = req.userId;
    
    const users = await User.findOne({
      where: user_id,
      include: [{model: Comment},{ model: Like }],
      
    });
    console.log('-----------------------------------------------------------------------------')
    console.log(users)
    console.log('-----------------------------------------------------------------------------')
    // console.log(users.dataValues)
    console.log(await users.getLikes({where: { like_id:1 } }));
    console.log('-----------------------------------------------------------------------------')
    // console.log(await users.getLikes({ where: { [Op.in]: user_id } }));
    console.log(await users.countComments(), '요기다 욘석아!');
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
