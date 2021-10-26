const nodemailer = require('nodemailer'); //노드메일러 모듈을 사용할 거다!

module.exports = async (req, res) => {
  let user_email = req.body.email; //받아온 email user_email에 초기화

  console.log(user_email);
  // 메일발송 함수

  let transporter = nodemailer.createTransport({
    service: 'gmail', //사용하고자 하는 서비스
    prot: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: 'fungapmbti@gmail.com', //gmail주소입력
      pass: 'ozam123!@#', //gmail패스워드 입력
    },
  });

  let info = await transporter.sendMail({
    from: 'fungapmbti@gmail.com', //보내는 주소 입력
    to: `${user_email}`, //위에서 선언해준 받는사람 이메일
    subject: '안녕하세요', //메일 제목
    text: 'ㅁㄴㅇㄹ', //내용
  });
};
