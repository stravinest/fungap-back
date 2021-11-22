const { sequelize, Sequelize } = require('../models');

//전체 게임 조회 로그인
exports.gameAllLogin = async function (user_id) {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname,t2.participaition_count t2.like_state from
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
exports.gameAll = async function () {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname,t2.participaition_count t2.like_state from
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
exports.gameAllLogin = async function (user_id) {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname,t2.participaition_count t2.like_state from
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

//상세게임 조회 비로그인
exports.gameAll = async function () {
  const query = `select t1.game_id, t1.game_title,t1.like_count, t2.nickname,t2.participaition_count t2.like_state from
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
