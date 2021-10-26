const Joi = require('joi');

exports.validatorSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error('이메일 형식을 맞춰주세요!')),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}$/))
    .required()
    .error(
      new Error(
        '비밀번호는 8자리 이상 20자리 이하의 숫자,영문자,특수문자의 조합이여야 합니다.'
      )
    ),
  confirm_password: Joi.equal(Joi.ref('password')).error(
    new Error('비밀번호가 일치하지 않습니다.')
  ),
  nickname: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9가-힣]{1,20}$/))
    .required()
    .error(new Error('한글자 이상의 한/영 또는 숫자만 사용가능합니다.')),
  user_mbti: Joi.string()
    .pattern(new RegExp(/^[A-Z]{4,4}$/))
    .required()
    .error(new Error('mbti를 선택해 주세요!')),
}).unknown();

exports.emailSchema = Joi.object({
  email: Joi.string()
  .email()
  .required()
  .error(new Error('이메일 형식을 맞춰주세요!'))
}).unknown();

exports.nicknameSchema = Joi.object({
  nickname: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9가-힣]{1,20}$/))
    .required()
    .error(new Error('한글자 이상의 한/영 또는 숫자만 사용가능합니다.'))
}).unknown();