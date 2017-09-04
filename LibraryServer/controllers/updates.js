const config = require('../config');
const mysql = require('mysql');
const dateformat = require('dateformat');

const pool = mysql.createPool(config.database);

exports.addItem = function(req, res, next){
  const itemType = req.body.itemType;
  const itemName = req.body.itemName;

  if(!itemType || !itemName){
    return res.status(422).send({ error: 'You must provide an item type and name!' });
  }

  addItemQuery(function(err, results){
    if(err) { return next(err); }

    res.end('The item has been added')
  }, req);
}

exports.checkOut = function(req, res, next){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if(!firstName || !lastName){
    return res.status(422).send({ error: 'You must provide a first and last name!' })
  }

  checkOutQuery(function(err, results){
    if(err) { return next(err); }

    res.end('The item has been checked out');
  }, req)
}

function addItemQuery(callback, req){
  var sql = "INSERT INTO tbl_Item(ItemType, ItemName, AdditionalInfo, isAvailable, isOverdue) VALUES (?,?,?,?,?) ";
  var inserts = [req.body.itemType, req.body.itemName, req.body.additionalInfo, true, false];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, results){
        callback(err, results);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n');
    }
  });
}

function checkOutQuery(callback, req){
  var curDate = new Date();
  var datetime = dateformat(curDate, 'yyyy-mm-dd hh:MM:ss');
  var sql = "INSERT INTO tbl_ItemLog(ItemID, PersonFirstName, PersonLastName, DateBorrowed, DateReturned, hasReturned) VALUES (?,?,?,?,?,?)" +
  ";UPDATE tbl_Item SET isAvailable=? WHERE ItemID=?";
  var inserts = [req.params.id, req.body.firstName, req.body.lastName, datetime, '', false, false, req.params.id];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, results){
        callback(err, results);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n')
    }
  });
}
