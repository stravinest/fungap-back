const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../../models");
const validatorSchema = require("../../middlewares/validator/validator");

exports.signUp = async (req, res) => {
  try {
    const { email, password, nickname, user_image, user_mbti } = res.locals         
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await User.create({ email, password: encryptedPassword, nickname, user_image, user_mbti });
    
    res.status(201).send({ result: "success", nickname: nickname });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "fail", error: err.message });
  }
};