import * as dotenv from 'dotenv';
dotenv.config({
  path: './env/.env',
});

type Config = {
  username: string;
  password: string;
  database: string;
  [key: string]: string | boolean | object;
};

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_END_POINT!,
    dialect: 'mysql',
    timezone: '+09:00',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true,
    },
  },
  test: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME! + '_test',
    host: process.env.DB_END_POINT!,
    dialect: 'mysql',
    timezone: '+09:00',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true,
    },
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_END_POINT!,
    dialect: 'mysql',
    timezone: '+09:00',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true,
    },
  },
};

export default config;
