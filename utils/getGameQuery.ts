import { sequelize } from '../models';
import * as Sequelize from 'sequelize';

//전체 게임 조회 로그인
export const gameAllLogin = async function (user_id: number) {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname, t2.participation_count, t2.like_state from
  (SELECT g.game_id,g.game_title,count(l.game_id) as like_count
   
    FROM games AS g
    left OUTER JOIN game_likes AS l
    ON g.game_id = l.game_id
    WHERE g.game_delete_code = 0
    GROUP BY g.game_id
    ORDER BY g.createdAt DESC) as t1
    join
    
  (select g.game_id,a.nickname, count(c.game_id) as participation_count,
  
  case l.game_id
  when g.game_id then 'true'
  else 'false'
  end as like_state
  FROM games AS g
  JOIN users AS a
  ON (g.user_id = a.user_id AND a.user_delete_code=0)
  left outer join game_likes as l
  on g.game_id = l.game_id and l.user_id = ${user_id}
  left outer join game_counts as c
  on g.game_id = c.game_id
  group by g.game_id
  ORDER BY g.createdAt DESC) as t2
  on t1.game_id = t2.game_id`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//전체게임 조회 비로그인
export const gameAll = async function () {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname, t2.participation_count, t2.like_state from
  (SELECT g.game_id,g.game_title,count(l.game_id) as like_count
   
    FROM games AS g
    left OUTER JOIN game_likes AS l
    ON g.game_id = l.game_id
    WHERE g.game_delete_code = 0
    GROUP BY g.game_id
    ORDER BY g.createdAt DESC) as t1
    join
    
  (select g.game_id,a.nickname, count(c.game_id) as participation_count,
  
  case g.game_id
  when '말안됨' then 'true'
  else 'false'
  end as like_state
  FROM games AS g
  JOIN users AS a
  ON (g.user_id = a.user_id AND a.user_delete_code=0)
  left outer join game_counts as c
  on g.game_id = c.game_id
  group by g.game_id
  ORDER BY g.createdAt DESC) as t2
  on t1.game_id = t2.game_id`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세 게임 조회 로그인
export const gameDetailLogin = async function (user_id:number, game_id:number) {
  const query = `select t1.game_id, t1.game_title,t1.game_desc,t1.game_quest1,t1.game_quest2, t1.like_count, t1.createdAt,t2.game_state, t2.nickname, t2.participation_count, t2.like_state,
  t2.nickname,t2.user_image,t2.user_mbti 
  
  from (SELECT g.game_id,g.game_desc,g.game_quest1,g.game_quest2,g.game_title,g.createdAt,count(l.game_id) as like_count
   
    FROM games AS g
    left OUTER JOIN game_likes AS l
    ON g.game_id = l.game_id
    WHERE g.game_delete_code = 0
    GROUP BY g.game_id
    ORDER BY g.createdAt DESC) as t1
    join
    
  (select g.game_id,a.nickname,a.user_image,a.user_mbti,count(c.game_id) as participation_count,
  
  case l.game_id
  when g.game_id then 'true'
  else 'false'
  end as like_state,

  case c.game_id
  when g.game_id then c.game_quest
  else 'false'
  end as game_state
  
  FROM games AS g
  JOIN users AS a
  ON (g.user_id = a.user_id AND a.user_delete_code=0)
  left outer join game_likes as l
  on g.game_id = l.game_id and l.user_id = ${user_id}
  left outer join game_counts as c
  on g.game_id = c.game_id
  group by g.game_id
  ORDER BY g.createdAt DESC) as t2
  on t1.game_id = t2.game_id
  WHERE  t1.game_id=${game_id}
  `;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세게임 조회 비로그인
export const gameDetail = async function (game_id:number) {
  const query = `select t1.game_id, t1.game_title,t1.game_desc,t1.game_quest1,t1.game_quest2, t1.like_count, t1.createdAt,t2.game_state, t2.nickname, t2.participation_count, t2.like_state,
  t2.nickname,t2.user_image,t2.user_mbti 
  
  from (SELECT g.game_id,g.game_desc,g.game_quest1,g.game_quest2,g.game_title,g.createdAt,count(l.game_id) as like_count
   
    FROM games AS g
    left OUTER JOIN game_likes AS l
    ON g.game_id = l.game_id
    WHERE g.game_delete_code = 0
    GROUP BY g.game_id
    ORDER BY g.createdAt DESC) as t1
    join
    
  (select g.game_id,a.nickname,a.user_image,a.user_mbti,count(c.game_id) as participation_count,
  
  case g.game_id
  when '말안되는값' then 'true'
  else 'false'
  end as like_state,

  case c.game_id
  when '말안되는값' then c.game_quest
  else 'false'
  end as game_state
  
  FROM games AS g
  JOIN users AS a
  ON (g.user_id = a.user_id AND a.user_delete_code=0)
  left outer join game_counts as c
  on g.game_id = c.game_id
  group by g.game_id
  ORDER BY g.createdAt DESC) as t2
  on t1.game_id = t2.game_id
  WHERE  t1.game_id=${game_id}
  `;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세게임 조회 quest1  전체 카운트
export const gameQuest1All = async function (game_id:number) {
  const query = `SELECT count(g.game_id) as count
  
  FROM games AS g
  left OUTER JOIN game_counts AS c
  ON g.game_id = c.game_id
  WHERE g.game_delete_code = 0 and c.game_quest = 1 and g.game_id = ${game_id}
  GROUP BY g.game_id
  ORDER BY g.createdAt DESC
  
  `;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세게임 조회 quest1
export const gameQuest1 = async function (game_id:number) {
  const query = `SELECT c.user_mbti,count(c.user_mbti) as count
  
  FROM game_counts AS c
  left OUTER JOIN games AS g
  ON c.game_id = g.game_id
  WHERE g.game_delete_code = 0 and c.game_quest = 1 and c.game_id = ${game_id}
  GROUP BY c.user_mbti
  ORDER BY g.createdAt DESC
  
  `;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세게임 조회 quest2  전체 카운트
export const gameQuest2All = async function (game_id:number) {
  const query = `SELECT count(g.game_id) as count
  
  FROM games AS g
  left OUTER JOIN game_counts AS c
  ON g.game_id = c.game_id
  WHERE g.game_delete_code = 0 and c.game_quest = 2 and g.game_id = ${game_id}
  GROUP BY g.game_id
  ORDER BY g.createdAt DESC`;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

//상세게임 조회 quest2
export const gameQuest2 = async function (game_id:number) {
  const query = `SELECT c.user_mbti,g.game_title,count(c.user_mbti) as count
  
  FROM game_counts AS c
  left OUTER JOIN games AS g
  ON c.game_id = g.game_id
  WHERE g.game_delete_code = 0 and c.game_quest = 2 and c.game_id = ${game_id}
  GROUP BY c.user_mbti
  ORDER BY g.createdAt DESC
  
  `;

  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });
  // return new_board_list;
};

export const gameCommentsAll = async function (game_id:number) {
  const queryComment = `
    SELECT u.user_image,u.user_id,c.game_id,u.user_mbti,u.nickname,c.game_comment,c.game_comment_id
    FROM game_comments AS c
    left OUTER JOIN users AS u
    ON c.user_id = u.user_id
    WHERE (c.game_comment_delete_code = 0 ANd c.game_id=${game_id})
    ORDER BY c.createdAt DESC`;

  return await sequelize.query(queryComment, {
    type: Sequelize.QueryTypes.SELECT,
  });
};
