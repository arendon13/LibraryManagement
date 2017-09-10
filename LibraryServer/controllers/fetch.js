const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

exports.items = function(req, res, next){
  var sql = "SELECT * FROM tbl_Item";

  querySQL(sql, function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult })
  });
}

exports.item = function(req, res, next){
  const id = req.params.id;

  var sql = "SELECT * FROM tbl_Item WHERE ItemID=?";
  var inserts = [id];
  sql = mysql.format(sql, inserts);

  querySQL(sql, function(err, result){
    if(err) { return next(err); }

    res.send({ result: result });
  });
}

exports.itemTypes = function(req, res, next){
  var sql = "SELECT * FROM tbl_ItemType";

  querySQL(sql, function(err, result){
    if(err) { return next(err); }

    res.send({ result: result });
  });
}

exports.itemLogs = function(req, res, next){
  const id = req.params.id;
  var sql = "SELECT item.* FROM tbl_Item item WHERE item.ItemID=?;SELECT itemLog.* FROM tbl_ItemLog itemLog WHERE itemLog.ItemID=?";
  var inserts = [id, id];
  sql = mysql.format(sql, inserts);
  var options = { sql: sql, nestTables: true};

  querySQL(options, function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult })
  });
}

// exports.getUser = function(req, res, next){
//   var sql = "SELECT * FROM tbl_User WHERE Email=?";
//   var inserts = ['test3@example.com'];
//   sql = mysql.format(sql, inserts);
//
//   querySQL(sql, function(err, result){
//     if(err) { return next(err); }
//
//     var userinfo = result[0];
//     var user = {
//       email: userinfo.Email,
//       password: userinfo.Password
//     }
//
//     console.log(user);
//     res.send({ result: result });
//   });
// }

function querySQL(sql, callback){
  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, rows){
        callback(err, rows);
      });
      connection.release();
    } else{
      console.log("Error connecting to database...\n\n")
    }
  });
}
