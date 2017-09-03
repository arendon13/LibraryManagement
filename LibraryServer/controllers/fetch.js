const config = require('../config');
const mysql = require('mysql');

const connection = mysql.createConnection(config.database);

connection.connect(function(err){
  if(!err){
    console.log("Database is connected ... \n\n");
  } else{
    console.log("Error connecting to database ... \n\n");
  }
});

exports.items = function(req, res, next){
  queryItems(function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'ItemsResult': queryResult });
  });
}

exports.itemLogs = function(req, res, next){
  queryItemLog(function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'ItemLogs': queryResult })
  }, req.params.id)
}

function queryItems(callback){
  connection.query("SELECT * FROM tbl_Item", function(err, rows){
    callback(err, rows);
  });
}

function queryItemLog(callback, id){
  connection.query("SELECT * FROM tbl_ItemLog WHERE ItemID=?", [id], function(err, rows){
    callback(err, rows);
  });
}
