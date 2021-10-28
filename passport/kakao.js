const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');

module.exports = () => {
  passport.use(
    'kakao',
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_PASSPORT_KEY,
        callbackURL: 'http://stravinest.shop/user/signin/kakao/callback', // 위에서 설정한 Redirect URI
        // callbackURL: 'http://localhost:3000/user/signin/kakao/callback', // 위에서 설정한 Redirect URI
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        console.log(accessToken);
        console.log(refreshToken);
        const email = profile['_json'].kakao_account.email;
        console.log(email);
        const nickname = profile.displayName;
        const provider = 'kakao';
        const sns_id = profile.id;
        let userInfo;
        userInfo = await User.findOne({ where: { provider, email } });
        console.log(userInfo);
        if (!userInfo) {
          await User.create({
            provider,
            email,
            nickname,
            sns_id,

            // user_mbti : 'mbti입력해주세요'
          });
          userInfo = await User.findOne({ where: { provider, email } });
        }
        return done(null, userInfo);
      }
    )
  );
};
