const express = require('express'); // express를 쓴다
const passport = require('passport');
const session = require('express-session');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const cors = require('cors');

const port = process.env.EXPRESS_PORT;

app.use(cors({ origin: true, credentials: true })); //cors option
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
