const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "garys_gang_admin", // update me
      password: "jSa$B1A8okF47DdMh4&wI2kN%PfWTy" // update me
    },
    type: "default"
  },
  server: "garys-gang.database.windows.net", // update me
  options: {
    database: "valorant", //update me
    encrypt: true
  }
};

function returnConnection(){
  var connection = new Connection(config);
  return connection;
};

exports.returnConnection = returnConnection;



