import * as Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `메일형식이 잘못되었습니다.`,
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `필수 필드입니다...`,
    'string.base': `스트링이 아닙니다.`,
  }),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .min(8)
    .required()
    .messages({
      'string.pattern.base': `비밀번호는 비밀번호는 최소 8 자이상, 최소 하나의 문자 및 하나의 숫자.`,
      'string.min': `최소 8자 이상이어야 합니다.`,
      'string.empty': `"a" cannot be an empty field`,
      'any.required': `"a" is a required field`,
    }),
});
