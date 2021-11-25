import * as express from 'express'; // express를 쓴다
import { Request, Response } from 'express';

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as dotenv from 'dotenv';
import socketIO from './socket';
import * as Sequelize from 'sequelize';
dotenv.config();
const app = express();

import { sequelize } from './models';

import * as cookieParser from 'cookie-parser';
import { Badword } from './models';

app.use(cookieParser());

const port = process.env.EXPRESS_PORT;
import * as cors from 'cors';

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
  .catch((err: Error) => {
    console.error(err);
  });

import Router from './routers';

app.use([Router]);
// app.use('/', renders); //테스트용 지우기
Router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

const httpServer = http.createServer(app);

//swagger
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// const options = {
//   ca: fs.readFileSync(process.env.HTTPS_CA),
//   key: fs.readFileSync(process.env.HTTPS_KEY),
//   cert: fs.readFileSync(process.env.HTTPS_CERT),
// };
// http.createServer(app).listen(3000);
// https.createServer(options, app).listen(443);

httpServer.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

socketIO(httpServer);

export default app;
