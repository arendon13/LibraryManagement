const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const config = require('./config');
const router = require('./router');


// const connection = mysql.createConnection(config.database);
//
// connection.connect(function(err){
//   if(!err){
//     console.log("Database is connected ... \n\n");
//   } else{
//     console.log("Error connecting to database ... \n\n");
//   }
// });

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);

const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
