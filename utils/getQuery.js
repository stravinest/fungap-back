const { sequelize, Sequelize } = require('../models');

//홈화면 조회 신규 순 로그인
exports.NewBoardHomeLogin = async function (user_id) {
  const queryNew = `
  SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE u.board_id 
  WHEN b.board_id THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  left OUTER JOIN likes AS u
  ON b.board_id = u.board_id AND u.user_id=${user_id}
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY b.createdAt DESC`;
  return await sequelize.query(queryNew, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};
//홈화면 조회 인기순 로그인
exports.PopBoardHomeLogin = async function (user_id) {
  const queryPop = `
  SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE u.board_id 
  WHEN b.board_id THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  left OUTER JOIN likes AS u
  ON b.board_id = u.board_id AND u.user_id=${user_id}
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY like_count DESC`;
  return await sequelize.query(queryPop, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//홈화면 조회 신규순 비로그인
exports.NewBoardHome = async function () {
  const query = `
  SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE l.board_id 
  WHEN '말이안되는값' THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY b.createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//홈화면 조회 인기순 비로그인
exports.PopBoardHome = async function () {
  const query = `
  SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE l.board_id 
  WHEN '말이안되는값' THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY like_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};

//상황별 페이지 게시글 전체 조회 로그인시
exports.situationBoardLogin = async function (user_id) {
  const query = `
  SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE u.board_id 
  WHEN b.board_id THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  left OUTER JOIN likes AS u
  ON b.board_id = u.board_id AND u.user_id=${user_id}
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY b.createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 비로그인
exports.situationBoard = async function () {
  const query = `
      SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
      CASE l.board_id 
      WHEN '말이안되는값' THEN 'true'
      ELSE 'false'
      END AS like_state
      FROM boards AS b
      left OUTER JOIN comments AS c
      ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
      left OUTER JOIN likes AS l
      ON b.board_id = l.board_id
      WHERE b.board_delete_code = 0
      GROUP BY b.board_id
      ORDER BY b.createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};

//게시글 디테일 페이지 조회(board) (로그인)
exports.detailBoardLogin = async function (user_id, board_id) {
  const queryBoard = `
  SELECT b.board_title,b.board_image,b.board_content,b.view_count,count(l.board_id) as like_count,
  CASE u.board_id
  WHEN b.board_id THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  left OUTER JOIN likes AS u
  ON b.board_id = u.board_id AND u.user_id=${user_id}
  WHERE (b.board_delete_code = 0 AND b.board_id=${board_id})
  `;
  return await sequelize.query(queryBoard, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//게시글 디테일 페이지 조회(comments) (로그인,비로그인)
exports.detailCommentsAll = async function (board_id) {
  const queryComment = `
    SELECT u.user_image,u.user_id,c.board_id,u.user_mbti,u.nickname,c.comment,c.comment_id
    FROM comments AS c
    left OUTER JOIN users AS u
    ON c.user_id = u.user_id
    WHERE (c.comment_delete_code = 0 ANd c.board_id=${board_id})
    ORDER BY c.createdAt DESC`;

  return await sequelize.query(queryComment, {
    type: Sequelize.QueryTypes.SELECT,
  });
};

//게시글 디테일 페이지 조회(board) (비로그인)
exports.detailBoard = async function (user_id, board_id) {
  const queryBoard = `
  SELECT b.board_title,b.board_image,b.board_content,b.view_count,count(l.board_id) as like_count,
  CASE l.board_id
  WHEN '말이안되는값' THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  WHERE (b.board_delete_code = 0 AND b.board_id=${board_id})
  `;
  return await sequelize.query(queryBoard, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
