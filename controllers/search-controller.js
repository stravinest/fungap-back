const { Sequelize, sequelize } = require('../models');
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
    
    for (i=0;i<board_list.body.hits.hits.length;i++) {
      if(board_list.body.hits.hits[i]._source.liked_users.includes(user_id)){
        board_list.body.hits.hits[i]._source.like_state = true;
      } else {
        board_list.body.hits.hits[i]._source.like_state = false;
      }
    }
    
    const search_board_list = board_list.body.hits.hits.map((board) => (
      board._source
    ));
        
    res.json({ result: 'success', search_board_list:search_board_list });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = homeSearchFunc;
