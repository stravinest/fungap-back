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
