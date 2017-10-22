const db = require('../services/database');
const mysql = require('mysql');

exports.items = function(req, res, next){
  var sql = "SELECT * FROM tbl_Item";

  db.queryGetSQL(sql, function(err, queryResult){
    if(err) { return next(err); }

    res.send({ 'result': queryResult })
  });
}

exports.item = function(req, res, next){
  const id = req.params.id;

  var sql = "SELECT * FROM tbl_Item WHERE ItemID=?";
  var inserts = [id];
  sql = mysql.format(sql, inserts);

  db.queryGetSQL(sql, function(err, result){
    if(err) { return next(err); }

    res.send({ result: result });
  });
}

exports.itemTypes = function(req, res, next){
  var sql = "SELECT * FROM tbl_ItemType";

  db.queryGetSQL(sql, function(err, result){
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

  db.queryGetSQL(options, function(err, queryResult){
    if(err) { return next(err); }

    console.log(queryResult[0][0].item);
    let lastEntryIndex = queryResult[1].length - 1;
    let lastEntry = queryResult[1][lastEntryIndex];
    if(lastEntry){
      console.log(lastEntry.itemLog);
    }

    res.send({ 'result': queryResult });
  });
}
