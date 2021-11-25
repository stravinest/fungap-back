import User, { associate as associateUser } from './user';
import Board, { associate as associateBoard } from './board';
import Celebrity, { associate as associateCelebrity } from './celebrity';
import Comment, { associate as associateComment } from './comment';
import Like, { associate as associateLike } from './like';
import Badword, { associate as associateBadword } from './badword';
import Chatlog, { associate as associateChatlog } from './chatlog';
import Mbti_relationship, {
  associate as associateMbti_relationship,
} from './mbti_relationship';
import Job_recommendation, {
  associate as associateJob_recommendation,
} from './job_recommendation';
import Obtion, { associate as associateObtion } from './obtion';
import sequelize from './sequelize';
const env = process.env.NODE_ENV || 'development';
import config from '../config/config';
import { Sequelize } from 'sequelize';
// const config = require('../config/config.js')[env];

export { User };
export { Comment };
export { Board };
export { Celebrity };
export { Like };
export { Obtion };
export { Job_recommendation };
export { Mbti_relationship };
export { Chatlog };
export { Badword };

export * from './sequelize';

const db = {
  Board,
  Comment,
  Like,
  User,
  Celebrity,
  Mbti_relationship,
  Job_recommendation,
  Obtion,
  Chatlog,
  Badword,
};

export type dbType = typeof db;

associateUser(db);
associateBoard(db);
associateCelebrity(db);
associateComment(db);
associateLike(db);
associateMbti_relationship(db);
associateJob_recommendation(db);
associateObtion(db);
associateChatlog(db);
