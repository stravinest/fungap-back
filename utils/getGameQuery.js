const { sequelize, Sequelize } = require('../models');

//홈화면 조회 신규 순 로그인
exports.gameAllLogin = async function (user_id) {
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
exports.gameAll = async function (user_id) {
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
