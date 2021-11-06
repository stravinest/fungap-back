const { Sequelize,sequelize } = require('../../models');

const homeSearchFunc = async (req, res) => {
  try {
      const user_id = req.userId
      const {keyword} = req.query;
      console.log(keyword)
      const keywords = keyword.split(' ')
      const list_keywords = []
      
      for (let i = 0; i < keywords.length; i++) {
        if (i == 0) {
          list_keywords.push(
            `t1.board_title LIKE '%${keywords[i]}%' OR t1.board_content LIKE '%${keywords[i]}%'`
          )
        } else {
          list_keywords.push(
            `OR t1.board_title LIKE '%${keywords[i]}%' OR t1.board_content LIKE '%${keywords[i]}%'`
          )
        }
      }
      
      const newlist_keywords = list_keywords.toString().replace(/,/g, "");
         
      const query = `
      select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
    (SELECT b.board_id,b.board_title,b.board_content,b.board_image,b.view_count,count(l.board_id) as like_count
 
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
    where ${newlist_keywords}`;

      const search_boards = await sequelize.query(query, {
        type: Sequelize.QueryTypes.SELECT,
      });
    res.json({ result: 'success', search_boards });
  } catch (err) {
    console.log(err)
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = homeSearchFunc;