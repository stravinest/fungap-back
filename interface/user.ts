import { User } from '../models';

//토큰 검증 미들웨어를 통과하며 정보를 받은 상태
export interface UserMiddlewareinfo {
  headers: {
    authorization: string;
  };
  loginUser: object;
  userId: number;
  userInfo: {
    userId: number;
    email: string;
    nickname: string;
    user_image: string;
    provider: string;
  };
}

//바디로 받은 정보 + 토큰 검증 미들웨어를 통과하며 정보를 받은 상태
export interface UserinfoReq {
  headers: {
    authorization: string;
  };
  body: {
    userId: number;
    email: string;
    nickname: string;
    user_mbti: string;
    user_image: string;
    provider: string;
  };
  loginUser: object;
  userId: number;
  userInfo: {
    userId: number;
    email: string;
    nickname: string;
    user_image: string;
    provider: string;
  };
}

export interface Request {
  [key: string]: any;
}
