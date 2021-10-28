const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `메일형식이 잘못되었습니다.`,
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `필수 필드입니다...`,
    'string.base': `스트링이 아닙니다.`,
  }),
  password: Joi.string().min(4).required().messages({
    'string.base': `"a" should be a type of 'text'`,
    'string.empty': `"a" cannot be an empty field`,
    'string.min': `최소 네자리 수 이상이어야 합니다.`,
    'any.required': `"a" is a required field`,
  }),
});

module.exports = loginSchema;
