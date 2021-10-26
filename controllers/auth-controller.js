const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');

//이메일 발송
const email = async (req, res) => {
  try {
    const { school_email } = req.body;
    const school_domain = school_email.split('@')[1];
    const isExist = await authService.findUnivByEmail(school_domain);
    if (!isExist) {
      res.status(403).send({ ok: false, message: 'not supported university' });
      return;
    }

    const isExistUser = await authService.findUser({ school_email });
    if (isExistUser) {
      res.status(403).send({ ok: false, message: 'already existing email' });
      return;
    }
    const authCode = Math.random().toString().substr(2, 6);
    const mailSender = new MailSender();
    const listener = new Listener(mailSender);
    listener.listen({
      targetEmail: school_email,
      type: 'auth',
      authCode,
    });
    res.status(200).send({ authCode });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err + ' : email 전송 실패!',
    });
  }
};
//이메일체크
const emailCheck = async (req, res) => {
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
  email,
  emailCheck,
};
