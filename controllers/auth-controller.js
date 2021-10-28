// const jwt = require('jsonwebtoken');
// const { User } = require('../models');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { info } = require('console');
var appDir = path.dirname(require.main.filename);

//이메일 발송
const sendEmail = async (req, res) => {
  const { email } = req.body;
  let authNum = Math.random().toString().substr(2, 6);
  let emailTemplete;
  ejs.renderFile(
    appDir + '/template/authMail.ejs',
    { authCode: authNum },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail(
    {
      from: 'FUNGAP',
      to: email,
      subject: '회원가입을 위한 인증번호를 입력해주세요.',
      html: emailTemplete,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      }
      res.status(202).send({ auth_code: authNum });
      transporter.close();
    }
  );
};

//이메일체크
const callEmail = async (req, res) => {
  const { school_email, user_id } = req.body;
  const school_domain = school_email.split('@')[1];
  const isExist = await authService.findUnivByEmail(school_domain);
  if (isExist) {
    await authService.updateUserByUserId(
      {
        school_auth: true,
        school_email,
        univ_id: isExist.univ_id,
        country_id: isExist.country_id,
      },
      user_id
    );
    res.status(200).send({ result: 'university authorized' });
    return;
  }
  res.status(403).send({ result: 'not supported university' });
};
module.exports = {
  sendEmail,
  callEmail,
};
