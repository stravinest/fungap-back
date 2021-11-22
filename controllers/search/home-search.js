const { Sequelize, sequelize } = require('../../models');
const { Client } = require('@elastic/elasticsearch');
const { errors } = require('@elastic/elasticsearch');


const client = new Client({
  node: process.env.elastic_node,
  auth: {
    username: process.env.elastic_username,
    password: process.env.elastic_password,
    log: 'trace'
  },
});

const homeSearchFunc = async (req, res) => {
  try {
    const user_id = req.userId;
    const { keyword } = req.query;
    console.log(keyword);
    const keywords = keyword.split(' ');
    

    const board_list = await client.search({
      index: 'fungapsearch',
      body: {
        query: { 
          multi_match: { 
            query: `${keywords}`,
            fields: ["board_title","board_desc","board_content"]
          }
        }
      }
    });

    // const test = await client.sql.query({
    //   body: {
    //     query: `SELECT board_title, board_desc, board_content AS "content"
    //     FROM "fungapsearch"
        
    //   `}
    // });

    // const liked_user = await client.search({
    //   index: 'fungaplikes',
    //   body: {
    //     query:{
    //       bool: {
    //         must: [
    //           { match: { board_id: "1" } },
    //           { match: { user_id: "3" } }
    //         ]
    //       }
    //     }
    //   }
    // });
    for (i=0;i<board_list.body.hits.hits.length;i++) {
      if(board_list.body.hits.hits[i]._source.liked_users.includes(user_id)){
        board_list.body.hits.hits[i]._source.like_state = true;
      } else {
        board_list.body.hits.hits[i]._source.like_state = false;
      }
    }
    // if (liked_user.body.hits.hits.length == 0 ) {
    //   const like_state = false;
    //   search_board_list.body.like_state = like_state
    // } else {
    //   const like_state = true;
    //   search_board_list.body.like_state = like_state
    // }
    
    console.log(board_list.body);
    console.log(board_list.body.hits.hits[4]._source.board_title);
    console.log(board_list.body.hits.hits[4]._source.liked_users.includes(2));
    const search_board_list = board_list.body.hits.hits.map((board) => (
      board._source
    ));
      
    
    
    // const query = `
    //   select t1.board_id, t1.board_title, t1.board_image, t1.board_desc, t1.board_content, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
    // (SELECT b.board_id,b.board_title,b.board_content,b.board_image, b.board_desc, b.view_count,count(l.board_id) as like_count
 
    // FROM boards AS b
    // left OUTER JOIN likes AS l
    // ON b.board_id = l.board_id
    // WHERE b.board_delete_code = 0
    // GROUP BY b.board_id
    // ORDER BY b.createdAt DESC) as t1
    // join
  
    // (select b.board_id, count(c.board_id) as comment_count,

    // case u.board_id
    // when b.board_id then 'true'
    // else 'false'
    // end as like_state
    // FROM boards AS b
    // LEFT OUTER JOIN comments AS c
    // ON (b.board_id = c.board_id AND c.comment_delete_code=0)
    // left outer join likes as u
    // on b.board_id = u.board_id and u.user_id = ${user_id}
    // group by b.board_id
    // ORDER BY b.createdAt DESC) as t2
    // join
    // (SELECT * FROM boards WHERE MATCH (board_title,board_desc) AGAINST ('${keywords}' IN NATURAL LANGUAGE MODE)) as t3
    // on t1.board_id = t2.board_id and t2.board_id = t3.board_id`;

    // const search_board = await sequelize.query(query, {
    //   type: Sequelize.QueryTypes.SELECT,
    // });
    
    
    res.json({ result: 'success', search_board_list:search_board_list });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = homeSearchFunc;
