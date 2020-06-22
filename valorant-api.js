/* eslint-disable no-console */
var express = require('express');
var { connection, Request } = require('tedious');
var bodyParser = require('body-parser');
var http = require('http'); 
const sqlSettings = require('./sql');
var dbPlayers = [];

function getallplayers(){
  console.log("getallplayers")
  connection = sqlSettings.returnConnection();

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
          console.log(`${rowCount} row(s) returned`);
      }
      ); 
    request.on("row", columns => {
      columns.forEach(column => {
        dbPlayers.push(column.value);
      });
    });
    connection.execSql(request);
    } 
  })
}

exports.getallplayers = getallplayers;