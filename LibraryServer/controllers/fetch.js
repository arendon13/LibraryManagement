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

    res.send({ 'result': queryResult });
  });
}

exports.itemLogs = function(req, res, next){
  queryItemLogs(function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult })
  }, req.params.id)
}

function queryItems(callback){
  connection.query("SELECT * FROM tbl_Item", function(err, rows){
    callback(err, rows);
  });
}
function queryItem(callback, id){
  var sql = "SELECT * FROM tbl_Item WHERE ItemID=?";
  var inserts = [id];
  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, rows){
    callback(err, rows);
  });
}

function queryItemLogs(callback, id){
  var sql = "SELECT item.* FROM tbl_Item item WHERE item.ItemID=?;SELECT itemLog.* FROM tbl_ItemLog itemLog WHERE itemLog.ItemID=?";
  var inserts = [id, id];
  sql = mysql.format(sql, inserts);
  var options = { sql: sql, nestTables: true}

  connection.query(options, function(err, rows, fields){
    callback(err, rows);
  });
}
