const { User } = require('../models');
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    if (authorization == null) {
      res.status(401).send({
        errorMessage: '로그인이 필요합니다.',
      });
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
