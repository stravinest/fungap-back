export interface IBasicinfo {
  email: string;
  nickname: string;
  user_image: string;
  user_mbti: string;
  provider: string;
  user_authority: string;
  user_id: number;
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
  data: {
    id: number;
    connected_at: string;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image: string;
    };
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile_image_needs_agreement: boolean;
      profile: [object];
      has_email: boolean;
      email_needs_agreement: boolean;
      is_email_valid: boolean;
      is_email_verified: boolean;
      email: string;
      has_age_range: boolean;
      age_range_needs_agreement: boolean;
      age_range: string;
      has_birthday: boolean;
      birthday: string;
      birthday_type: string;
      has_gender: boolean;
      gender_needs_agreement: boolean;
      gender: string;
    };
  };
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

export interface verifytoken {
  email: string;
  user_mbti: string;
  user_authority: string;
  provider: string;
  user_id: number;
  iat: number;
  exp: number;
}
