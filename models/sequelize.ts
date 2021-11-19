import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);
export { sequelize }; //대문자가 클래스 소문자가 인스턴스
