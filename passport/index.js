// const passport = require('passport');
// const local = require('./local');
// const kakao = require('./kakao');
// const google = require('./google');
// const { User } = require('../models');

// module.exports = () => {
//   passport.serializeUser((user, document) => {
//     console.log('serializeUser ', user);
//     document(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     console.log('deserializeUser id ', id);
//     User.findOne({
//       where: { user_id: id },
//     })
//       .then((user) => done(null, user))
//       .catch((err) => done(err));
//   });

//   local();
//   google();
//   kakao();
// };
