import User, { associate as associateUser } from './user';
import Board, { associate as associateBoard } from './board';
import Celebrity, { associate as associateCelebrity } from './celebrity';
import Comment, { associate as associateComment } from './comment';
import Like, { associate as associateLike } from './like';
import Chatlog from './chatlog';
import Mbti_relationship, {
  associate as associateMbti_relationship,
} from './mbti_relationship';
import Game, { associate as associateGame } from './game';
import Game_count, { associate as associateGame_count } from './game_count';
import Game_like, { associate as associateGame_like } from './game_like';
import Game_comment, { associate as associateGame_comment } from './game_comment';



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
export { Mbti_relationship };
export { Chatlog };
export { Game };
export { Game_count };
export { Game_like };
export { Game_comment };

export * from './sequelize';

const db = {
  Board,
  Comment,
  Like,
  User,
  Celebrity,
  Mbti_relationship,
  Chatlog,
  Game,
  Game_count,
  Game_like,
  Game_comment
};

export type dbType = typeof db;

associateUser(db);
associateBoard(db);
associateCelebrity(db);
associateComment(db);
associateLike(db);
associateMbti_relationship(db);
associateGame(db);
associateGame_count(db);
associateGame_like(db);
associateGame_comment(db);

