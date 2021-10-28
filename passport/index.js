const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const google = require('./google');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log('serializeUser ', user);
    done(null, user.user_id);
  });

  passport.deserializeUser(async function (id, done) {
    // console.log('deserializeUser id ', id);
    await User.findOne({
      where: { user_id: id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  google();
  kakao();
};
