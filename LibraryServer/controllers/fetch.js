const db = require('../services/database');
const mysql = require('mysql');
const dateformat = require('dateformat');
const Updates = require('./updates');

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

    if(queryResult[0][0].item.isOverdue === 0){ // look if the item is not overdue
      let lastEntryIndex = queryResult[1].length - 1;
      let lastEntry = queryResult[1][lastEntryIndex]; // get the last log entry of the item
      if(lastEntry){
        if(isOverdue(lastEntry.itemLog)){ // check if the item is overdue
          Updates.MarkOverdue(lastEntry.itemLog.ItemID);
        }
      }
    }

    res.send({ 'result': queryResult });
  });
}

function isOverdue(itemLog){
  if(itemLog.DueBackBy === ''){
    return false;
  }

  var curDate = new Date();
  var dateTime = dateformat(curDate, 'mm/dd/yyyy');
  var dateDue = itemLog.DueBackBy.split('/');
  dateTime = dateTime.split('/');

  if(parseInt(dateTime[2],10) > parseInt(dateDue[2],10)){
    return true;
  } else if ((parseInt(dateTime[0],10) > parseInt(dateDue[0],10)) && (dateTime[2] === dateDue[2])) {
    return true;
  } else if ((dateTime[0] === dateDue[0]) && (dateTime[2] === dateDue[2]) && (parseInt(dateTime[1],10) > parseInt(dateDue[1],10))){
    return true;
  } else {
    return false;
  }

}
