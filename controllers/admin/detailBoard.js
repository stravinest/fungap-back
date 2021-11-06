const { User } = require('../../models');
const { Board, Comment,Like,Sequelize,sequelize } = require('../../models');
const { Op } = require('sequelize');

const detailBoardFunc = async (req, res) => {
  try {
    const user_id = req.userId;
    const {board_id} = req.params;

    const query = `
    select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state, JSON_ARRAYAGG(JSON_OBJECT('comment_id', t3.comment_id,'comment', t3.comment, 'user_id',t3.user_id, 'user_image', t3.user_image, 'user_mbti', t3.user_mbti, 'nickname', t3.nickname,'board_id',t3.board_id)) as comments from
    (SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(distinct l.board_id) as like_count,c.comment
    FROM boards AS b
    left OUTER JOIN likes AS l
    ON b.board_id = l.board_id
    left OUTER JOIN comments AS c
    ON b.board_id = c.board_id
    WHERE b.board_delete_code = 0
    GROUP BY b.board_id
    ORDER BY b.createdAt DESC) as t1
    join
    (select b.board_id, count(distinct c.comment_id) as comment_count,
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
    left outer join
    (SELECT c.board_id, c.user_id, u.user_image, u.user_mbti, u.nickname, c.comment_id, c.comment
      FROM boards AS b
      left Outer Join users AS u 
      On b.user_id = u.user_id
      left OUTER JOIN comments AS c
      ON b.board_id = c.board_id
      WHERE b.board_delete_code = 0
      ORDER BY b.createdAt DESC) as t3
    on t1.board_id = t2.board_id AND t1.board_id = t3.board_id 
    WHERE t1.board_id = ${board_id}`;
    const board = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    res.json({ result: 'success', board });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '게시글 상세를 불러오는데 실패했습니다.',
    });
  }
};

module.exports = detailBoardFunc;
