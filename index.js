const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');

const startRouter = require('./quickstart');


// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '$uz1sGreat',
  database: 'mydb'
});

const server = {
  port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

//use routes
app.use('/quickstart', startRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening on port: ${server.port}`));
