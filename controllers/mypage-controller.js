const {
  Board,
  User,
  Like,
  Comment,
  sequelize,
  Sequelize,
} = require('../models');

//유저 정보 조회
const getUserInfo = async (req, res) => {
  try {
    const nickname = req.userInfo.nickname;
    const provider = req.userInfo.provider;

    const userInfo = await User.findOne({
      where: { nickname: nickname, provider: provider },
    });
    res.status(200).json({
      result: 'success',
      user: {
        nickname: userInfo.nickname,
        user_image: userInfo.user_image,
        user_mbti: userInfo.user_mbti,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//유저 정보 수정
const patchUserInfo = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const provider = req.userInfo.provider;

    const resNickname = req.body.nickname;
    const resUserImage = req.body.user_image;
    const resUserMbti = req.body.user_mbti;

    const userInfo = await User.findOne({
      where: { user_id: userId, provider: provider },
    });
    await User.update({
      nickname: resNickname,
      user_image: resUserImage,
      user_mbti: resUserMbti,
    }, {where: { user_id: userId }});


    res.status(200).json({
      result: 'success',
      user: {
        nickname: resNickname,
        user_image: resUserImage,
        user_mbti: resUserMbti,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//유저 탈퇴
const deleteUserInfo = async (req, res) => {
  try {
    const nickname = req.userInfo.nickname;
    const provider = req.userInfo.provider;

    const userInfo = await User.findOne({
      where: { nickname: nickname, provider: provider },
    });
    await userInfo.update({ user_delete_code: 1 });
    res.status(200).json({
      result: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

//좋아요 된 글 목록 (미완성)
const likedBoardList = async (req, res) => {
  try {
    console.log(req.userInfo);
    const nickname = req.userInfo.nickname;
    const provider = req.userInfo.provider;
    const userId = req.userInfo.userId;
    // const userInfo = await User.findOne({
    //   where: { nickname: nickname, provider: provider },
    // });
    // console.log(userInfo);

    // const userId = userInfo.dataValues.user_id;
    console.log(userId);

    const query = `SELECT b.board_id, b.board_title,b.board_content,b.view_count,b.board_image, count(l.board_id) as likeCnt,count(c.board_id) as commentCnt,
    CASE lb.board_id
    WHEN b.board_id THEN 'true'
    ELSE 'false'
    END AS like_state
    
        FROM database_final_project.boards AS b
        LEFT OUTER JOIN database_final_project.comments AS c
        ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
        LEFT OUTER JOIN database_final_project.likes AS l
        ON b.board_id = l.board_id
        LEFT OUTER JOIN database_final_project.likes AS lb
        ON (b.board_id = lb.board_id AND lb.user_id = ${userId})
        WHERE b.board_id = lb.board_id
        GROUP BY b.board_id
        
        ORDER BY b.createdAt DESC`;

    const likedBoardList = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    res.status(200).json({
      result: 'success',
      likedBoardList,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.',
    });
  }
};

module.exports = {
  getUserInfo,
  patchUserInfo,
  deleteUserInfo,
  likedBoardList,
};
