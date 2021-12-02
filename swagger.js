const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'fungap',
    description: 'mbti',
  },
  host: 'nyannyan.shop',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Board', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Game', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Comment', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Chat', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Mypage', // Tag name
      description: '', // Tag description
    },
    {
      name: 'Admin', // Tag name
      description: '', // Tag description
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Bearer <Token> 을 입력해주세요.',
    },
  }, // by default: empty object
  definitions: {}, // by default: empty object
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routers/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
