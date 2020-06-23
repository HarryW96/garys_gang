/* eslint-disable no-console */
var express = require('express');
var { connection, Request } = require('tedious');
var bodyParser = require('body-parser');
var http = require('http');
const sqlSettings = require('./sql');
const sql = require('mssql')
const dataFormatter = require('./data-formatter');
var dbPlayers = {};

async function getallplayers() {
  return new Promise((res) => {
    console.log("getallplayers")
    connection = sqlSettings.returnConnection();
    dbPlayers = [];

    connection.on("connect", err => {
      if (err) {
        console.error(err.message);
      } else {
        const request = new Request(
          "SELECT discordName as PlayerName FROM Player ORDER BY discordName ASC",
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              //it works
              console.log(`${rowCount} row(s) returned`);
              res(dbPlayers);
            }
          }
        )
        connection.execSql(request);

        request.on("row", columns => {
          console.log('row get')
          columns.forEach(column => {
            dbPlayers.push(column.value);
          });
        });

      }
    })
  })
}

async function getPlayerOverview(){
return new Promise((res) => {
  console.log("getPlayerOverview")
  connection = sqlSettings.returnConnection();
  playerOverview = [];

  connection.on("connect", err => {
    if (err) {
      console.error(err.message);
    } else {
      const request = new Request(
        "SELECT discordName, MAX(combatScore) AS Max, MIN(combatScore) AS Min, AVG(combatScore) AS Average, COUNT(combatScore) AS 'Games' FROM PlayerScore GROUP BY discordName ORDER BY AVG(combatScore) desc",
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          } else {
            //it works
            console.log(`${rowCount} row(s) returned`);
            res(playerOverview);
          }
        }
      )
      connection.execSql(request);
      count = 1;
      request.on("row", columns => {
        console.log('row get')
        newPlayer = {};
        columns.forEach(column => {
          newPlayer[column.metadata.colName] = column.value;

          //Make a clean name for css class
          if(column.metadata.colName == "discordName"){
            newPlayer["clean-name"] = dataFormatter.returnCleanUsername(column.value);
          }

          //Work out position
            newPlayer["position"] = dataFormatter.ordinal_suffix_of(count);
        });
        playerOverview.push(newPlayer);
        count += 1;
      });
    }
  })
})



}


exports.getallplayers = getallplayers;
exports.getPlayerOverview = getPlayerOverview;