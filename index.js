const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser'),
  fs = require('fs');


const startRouter = require('./routes/quickstart');
const fetchRouter = require('./routes/fetch');
const removeRouter = require('./routes/remove');
const searchRouter = require('./routes/search');


// setup database
fs.readFile('db_secret.json', (err, content) => {
  if (err) {
    console.log('Error loading db secret file: ' + err);
    return;
  }
  db = mysql.createConnection(JSON.parse(content));
});

const server = {
  port: 4040
};

// use the modules
app.use(cors())
app.use(bodyParser.json());

//use routes
app.use('/quickstart', startRouter);
app.use('/fetch', fetchRouter);
app.use('/remove', removeRouter);
app.use('/search', searchRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening on port: ${server.port}`));
