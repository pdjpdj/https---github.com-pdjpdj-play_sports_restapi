const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');

// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

//youTube API key: AIzaSyD6aC_SIbm2xIS_RRwMps3--T8y3KqWJJ4

var server = {
  port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

// starting the server
app.listen( server.port , () => console.log(`Server started, listening on port: ${server.port}`));
