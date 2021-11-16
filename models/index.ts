import * as Sequelize from 'sequelize';
import * as sequelize from './sequelize';
import User, { associate as associateUser } from './user';
import Board, { associate as associateBoard } from './board';
import Celebrity, { associate as associateCelebrity } from './celebrity';
import Comment, { associate as associateComment } from './comment';
import Like, { associate as associateLike } from './like';
import Mbti_relationship, {
  associate as associateMbti_relationship,
} from './mbti_relationship';
import Job_recommendation, {
  associate as associateJob_recommendation,
} from './job_recommendation';
import Obtion, { associate as associateObtion } from './obtion';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

export * from './sequelize';

export { User };
export { Comment };
export { Board };
export { Celebrity };
export { Like };
export { Obtion };
export { Job_recommendation };
export { Mbti_relationship };

const db = {
  Board,
  Comment,
  Like,
  User,
  Celebrity,
  Mbti_relationship,
  Job_recommendation,
  Obtion,
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
