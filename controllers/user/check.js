const { User } = require("../../models");

exports.dupEmail= async (req, res) => {
    try {
      console.log(req.body);
      const { userId } = await signUp.userIdSchema.validateAsync(req.body);
      const existUsers = await User.findAll({ where: { userId } });
      if (existUsers.length) {
        res.status(400).send({
          errorMessage: "이미 사용중인 ID입니다.",
        });
      } else {
        res.status(200).send({
          message: "사용가능한 ID입니다.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).send({
        msg: "ID는 3자리 이상 20자리 이하여야 합니다.(특수문자 사용불가)!",
      });
    }
};

exports.dupNickname= async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = await signUp.userIdSchema.validateAsync(req.body);
    const existUsers = await User.findAll({ where: { userId } });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: "이미 사용중인 ID입니다.",
      });
    } else {
      res.status(200).send({
        message: "사용가능한 ID입니다.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({
      msg: "ID는 3자리 이상 20자리 이하여야 합니다.(특수문자 사용불가)!",
    });
  }
};