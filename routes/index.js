var express = require('express');
const app = require('../app');
const sqlSettings = require('../sql');
const valorantAPI = require('../valorant-api');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Game Night Centeral' });
});

router.get('/valorant', function (req, res, next) {
  console.log("valorant from index router");
  valorantAPI.getallplayers().then(function (storedplayers) {
    valorantAPI.getPlayerOverview().then(function (overview){
      res.render('valorant', { title: 'Game Night Centeral ¦ Valorant', players: storedplayers, playerOverview: overview })
    })
  })




});

module.exports = router;
