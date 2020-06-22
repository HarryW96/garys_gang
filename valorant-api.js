/* eslint-disable no-console */
var express = require('express');
var { connection, Request } = require('tedious');
var bodyParser = require('body-parser');
var http = require('http');
const sqlSettings = require('./sql');
const sql = require('mssql')
var dbPlayers = [];

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
          "SELECT discordName as PlayerName FROM Player",
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


exports.getallplayers = getallplayers;