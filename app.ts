import * as express from 'express'; // express를 쓴다
import { Request, Response, NextFunction } from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import socketIO from './socket';
import Logger from './config/logger';

dotenv.config({
  path: './env/.env',
});
const app = express();

import morganMiddleware from './config/morganMiddleware';
app.use(morganMiddleware); // 콘솔창에 통신결과 나오게 해주는 것

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

import { sequelize } from './models';
import * as cookieParser from 'cookie-parser';

app.use(cookieParser());

const port = process.env.EXPRESS_PORT;
import * as cors from 'cors';

let colsOptions = {
  origin: [
    'http://localhost:3000', // 접근 권한을 부여하는 도메
    'http://fungap.shop',
    'https://localhost:3000',
    'https://fungap.shop',
    'http://velog-clone.shop',
    'https://velog-clone.shop',
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
  .sync({ force: false })
  .then(() => {
    Logger.info('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

import Router from './routers';

app.use([Router]);
// app.use('/', renders); //테스트용 지우기
Router.get('/', (req: Request, res: Response) => {
  res.render('index');
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  Logger.debug(`listening at http://localhost:${port}`);
});

socketIO(httpServer);

export default app;
