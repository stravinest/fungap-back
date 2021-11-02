const express = require('express'); // express를 쓴다
const fs = require('fs');
const http = require('http');
const https = require('https');
// const env = process.env.NODE_ENV;
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.EXPRESS_PORT;
const cors = require('cors');
let colsOptions = {
  origin: '*', // 접근 권한을 부여하는 도메인
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
};
app.use(cors(colsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// html을 대체하는 ejs 엔진을 설정 test용
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

sequelize
  .sync({ force: true })
  // .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const Router = require('./routers');
app.use([Router]);
// app.use('/', renders); //테스트용 지우기
Router.get('/', (request, res) => {
  res.render('index');
});

// const options = {
//   ca: fs.readFileSync(process.env.HTTPS_CA),
//   key: fs.readFileSync(process.env.HTTPS_KEY),
//   cert: fs.readFileSync(process.env.HTTPS_CERT),
// };
// http.createServer(app).listen(3000);
// https.createServer(options, app).listen(443);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
module.exports = app;
