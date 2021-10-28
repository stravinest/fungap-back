const express = require('express'); // express를 쓴다
const session = require('express-session');
const passport = require('passport');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const port = process.env.EXPRESS_PORT;
const cors = require('cors');

const options = {
  origin: '*', // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};
app.use(cors(options));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Router = require('./routers');
app.use([Router]);
// html을 대체하는 ejs 엔진을 설정 test용
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

sequelize
  // .sync({ force: true })
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

passportConfig(); //패스포트 설정
app.use(
  session({ secret: 'secret key', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

const Router = require('./routers');
app.use([Router]);
// app.use('/', renders); //테스트용 지우기
Router.get('/', (request, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
