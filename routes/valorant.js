var express = require('express');
var { Connection, Request } = require('tedious');
var bodyParser = require('body-parser');
var http = require('http'); 
const sqlSettings = require('../sql');
var connection = sqlSettings.returnConnection();
var dbPlayers = [];

var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("render");
  res.render('valorant');
});


module.exports = router;
