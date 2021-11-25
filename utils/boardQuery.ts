import { sequelize } from '../models';
import * as Sequelize from 'sequelize';

//홈화면 조회 신규 순 로그인
export const NewBoardHomeLogin = async function (user_id: number) {
  const queryNew = `select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id`;

  return await sequelize.query(queryNew, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};
//홈화면 조회 인기순 로그인
export const PopBoardHomeLogin = async function (user_id: number) {
  const queryPop = `select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.like_count DESC`;

  return await sequelize.query(queryPop, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//홈화면 조회 신규순 비로그인
export const NewBoardHome = async function () {
  const query = `select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//홈화면 조회 인기순 비로그인
export const PopBoardHome = async function () {
  const query = `select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.like_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};

//상황별 페이지 시작
//상황별 페이지 게시글 전체 조회 로그인시(최신순)
export const situationBoardLogin = async function (user_id: number) {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 비로그인(최신순)
export const situationBoard = async function () {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 로그인시(인기순)
export const situationBoardPopLogin = async function (user_id: number) {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.like_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 비로그인(인기순)
export const situationBoardPop = async function () {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.like_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 로그인시(조회수순)
export const situationBoardViewLogin = async function (user_id: number) {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.view_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별 페이지 게시글 전체 조회 비로그인(조회수순)
export const situationBoardView = async function () {
  const query = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  ORDER BY t1.view_count DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//상황별페이지 끝

//게시글 디테일 페이지 조회(board) (로그인)
export const detailBoardLogin = async function (
  user_id: number,
  board_id: number
) {
  const queryBoard = `
  select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_delete_code,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case u.board_id
  when b.board_id then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  left outer join likes as u
  on b.board_id = u.board_id and u.user_id = ${user_id}
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  WHERE (t1.board_delete_code = 0 AND t1.board_id=${board_id})
  `;
  return await sequelize.query(queryBoard, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
//게시글 디테일 페이지 조회(comments) (로그인,비로그인)
export const detailCommentsAll = async function (board_id: number) {
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
export const detailBoard = async function (board_id: number) {
  const queryBoard = `select t1.board_id, t1.board_title, t1.board_image,t1.board_desc,t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
  (SELECT b.board_id,b.board_title,b.board_image,b.board_desc,b.board_content,b.view_count,count(l.board_id) as like_count
   
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    
  (select b.board_id, count(c.board_id) as comment_count,
  
  case c.board_id
  when '말이안되는값' then 'true'
  else 'false'
  end as like_state
  FROM boards AS b
  LEFT OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code=0)
  group by b.board_id
  ORDER BY b.createdAt DESC) as t2
  on t1.board_id = t2.board_id
  where t1.board_id=${board_id}`;
  return await sequelize.query(queryBoard, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
