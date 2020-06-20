var express = require('express');
const sql = require('../sql');
const app = require('../app');
var router = express.Router();
var connection = returnConnection();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/valorant', function(req, res, next) {
  res.render('valorant');
});

router.get('/valorant?get-players',function(req, res, next) {

  const request = new Request(
    `SELECT  d.discordName as CategoryName,
     FROM [valorant].[Valorant] d`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );
  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });
  connection.execSql(request);

});


module.exports = router;
