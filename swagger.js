const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'fun gap',
    description: 'Description',
  },
  host: '3.34.255.91', //배포 하려고 하는 host에 맞춰줘야 동작함
  basePath: '/',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Login&User',
      description: '로그인,회원가입',
    },
    {
      name: 'Comment',
      description: '댓글',
    },
    {
      name: 'Mypage',
      description: '마이페이지',
    },
    {
      name: 'Admin',
      description: '관리자페이지',
    },
  ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js', './routers/*'];
// const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
//swaggerAutogen으로 outputfile 파일을 app.js 루트로 api 들을 생성한다.
//이때 명령어는 터미널에서 node swagger.js
