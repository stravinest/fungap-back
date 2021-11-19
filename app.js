const express = require('express'); // express를 쓴다
const fs = require('fs');
const http = require('http');
const https = require('https');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output');
const app = express();
const dotenv = require('dotenv');
dotenv.config({
  path: './env/.env',
});
const { sequelize } = require('./models');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = process.env.EXPRESS_PORT;
const cors = require('cors');
let colsOptions = {
  origin: [
    'http://localhost:3000', // 접근 권한을 부여하는 도메
    'http://fungap.shop',
  ],
  credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  // exposedHeaders: [Set - Cookie],
  methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
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
  // .sync({ force: true })
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const Router = require('./routers');
const { cookie } = require('request');
app.use([Router]);

// Router.get('/', (request, res) => {
//   res.render('index');
// });
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
module.exports = app;
