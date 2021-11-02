const express = require('express');
const router = express.Router();
const getBoardFunc = require('../controllers/home/getBoard');

router.get('/board', getBoardFunc);

module.exports = router;