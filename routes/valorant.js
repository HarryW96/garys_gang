var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/valorant', function(req, res, next) {
  res.render('valorant');
});

router.get('/valorant?get-players',function(req, res, next) {
  
});

module.exports = router;
