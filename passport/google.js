const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_PASSPORT_ID,
        clientSecret: process.env.GOOGLE_PASSPORT_PW,
        callbackURL: 'http://localhost:3000/user/signin/google/callback',
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log('google profile', profile);
        console.log('access', accessToken);
        console.log('refresh', refreshToken);
        const email = profile.emails[0].value;
        const nickname = profile.displayName;
        const provider = 'google';
        let userInfo;
        userInfo = await User.findOne({ where: { provider, email } });
        if (!userInfo) {
          await User.create({
            provider,
            email,
            nickname,
          });
          userInfo = await User.findOne({ where: { provider, email } });
        }
        return done(null, userInfo);
      }
    )
  );
};
