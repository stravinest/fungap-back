const { User } = require('../models');

exports.checkAuthority = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log(req.userId);
    const userInfo = await User.findOne({ where: userId });
    console.log(userInfo.user_authority);
    console.log('dkdkdkdkdkdkdkdk');
    if (userInfo.user_authority == 'public') {
      return res
        .status(403)
        .json({ result: 'fail', message: '접근 권한이 없습니다.' });
    }
    next();
  } catch (err) {
    next(err);
  }
};
