const Joi = require('joi');

const userEditSchema = Joi.object({
  user_image: Joi.string().empty('').messages({
    'string.base': `"a" should be a type of 'text'`,
  }),
  nickname: Joi.string().required().messages({
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
  user_mbti: Joi.string().empty('').messages({
    'string.empty': `"a" cannot be an empty field`,
    'any.required': `"a" is a required field`,
    'string.base': `"a" should be a type of 'text'`,
  }),
});

module.exports = userEditSchema;
