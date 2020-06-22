var express = require('express');
const app = require('../app');
const sqlSettings = require('../sql');
const valorantAPI = require('../valorant-api');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/valorant', function (req, res, next) {
  console.log("valorant from index router");
  newplayers = await valorantAPI.getallplayers();
  res.render('valorant', { title: 'Valorant', players: newplayers })

});

module.exports = router;
