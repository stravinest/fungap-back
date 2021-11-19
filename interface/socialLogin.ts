export interface GoogleReq {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  google: JSON;
}

export interface KakaoReq {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  kakao: JSON;
}

export interface NaverReq {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  naver: JSON;
}

export interface GoogleProfile {
  sub: number;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface KakaoProfile {
  [key: string]: any;
}

export interface NaverProfile {
  resultcode: string;
  message: string;
  response: {
    email: string;
    nickname: string;
    id: string;
    profile_image: string;
    name: string;
  };
}

export interface LocalProfile {
  dataValues: {
    user_id: number;
    email: string;
    user_image: string;
    user_mbti: string;
    password: string;
    user_authority: string;
    user_delete_code: number;
    refresh_token: string;
    provider: string;
    sns_id: string;
    [key: string]: any;
  };
}
