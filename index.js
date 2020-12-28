const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');

const startRouter = require('./routes/quickstart');
const fetchRouter = require('./routes/fetch');
const removeRouter = require('./routes/remove');
const searchRouter = require('./routes/search');


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
app.use('/fetch', fetchRouter);
app.use('/remove', removeRouter);
app.use('/search', searchRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening on port: ${server.port}`));
