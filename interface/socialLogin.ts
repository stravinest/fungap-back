export interface GoogleUserinfo {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  google: JSON;
}

export interface KakaoUserinfo {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  kakao: JSON;
}

export interface NaverUserinfo {
  headers: {
    authorization: string;
  };
  body: {
    access_token: string;
  };
  naver: JSON;
}
