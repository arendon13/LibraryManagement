const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

// TODO: Clean up file by reducing the amount of repeated code

exports.items = function(req, res, next){
  queryItems(function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult });
  });
}

exports.item = function(req, res, next){
  queryItem(function(err, result){
    if(err) { return next(err); }

    res.send({ result: result });
  }, req.params.id);
}

exports.itemTypes = function(req, res, next){
  queryItemTypes(function(err, result){
    if(err) { return next(err); }

    res.send({ result: result });
  });
}

exports.itemLogs = function(req, res, next){
  queryItemLogs(function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult })
  }, req.params.id)
}

function queryItems(callback){
  pool.getConnection(function(err, connection){
    if(!err){
      connection.query("SELECT * FROM tbl_Item", function(err, rows){
        callback(err, rows);
      });
      connection.release();
    } else{
      console.log("Error connecting to database ... \n\n");
    }
  });
}

function queryItemLogs(callback, id){
  var sql = "SELECT item.* FROM tbl_Item item WHERE item.ItemID=?;SELECT itemLog.* FROM tbl_ItemLog itemLog WHERE itemLog.ItemID=?";
  var inserts = [id, id];
  sql = mysql.format(sql, inserts);
  var options = { sql: sql, nestTables: true}

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(options, function(err, rows){
        callback(err, rows);
      });
      connection.release();
    } else{
      console.log("Error connecting to database ... \n\n");
    }
  });
}

function queryItem(callback, id){
  var sql = "SELECT * FROM tbl_Item WHERE ItemID=?";
  var inserts = [id];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, rows){
        callback(err, rows);
      })
      connection.release();
    } else{
      console.log("Error connecting to database...\n\n");
    }
  });
}

function queryItemTypes(callback){
  var sql = "SELECT * FROM tbl_ItemType"

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, rows){
        callback(err, rows);
      });
      connection.release();
    } else{
      console.log("Error connecting to database...\n\n");
    }
  });
}
