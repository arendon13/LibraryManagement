const db = require('../services/database');
const mysql = require('mysql');
const dateformat = require('dateformat');

exports.addItem = function(req, res, next){
  const ItemType = req.body.ItemType;
  const ItemName = req.body.ItemName;
  const AdditionalInfo = req.body.AdditionalInfo;

  if(!ItemType || !ItemName){
    return res.status(422).send({ error: 'You must provide an item type and name!' });
  }

  var sql = "INSERT INTO tbl_Item(ItemType, ItemName, AdditionalInfo, isAvailable, isOverdue) VALUES (?,?,?,?,?) ";
  var inserts = [ItemType, ItemName, AdditionalInfo, true, false];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err) { return next(err); }

    res.end('The item has been added')
  }, req);
}

exports.addItemType = function(req, res, next){
  const ItemType = req.body.ItemType;

  if(!ItemType){
    return res.status(422).send({ error: 'You must provide an item type!' });
  }

  var sql = "INSERT INTO tbl_ItemType(ItemTypeName) VALUES (?)";
  var inserts = [ItemType];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err) { return next(err); }

    res.end('The item type has been added');
  });
}

exports.checkOut = function(req, res, next){
  const firstName = req.body.PersonFirstName;
  const lastName = req.body.PersonLastName;
  const id = req.params.id;
  var dueDate = '';

  if(req.body.DueBackBy){
    dueDate = req.body.DueBackBy;
  }

  if(!firstName || !lastName){
    return res.status(422).send({ error: 'You must provide a first and last name!' })
  }

  var curDate = new Date();
  var datetime = dateformat(curDate, 'mm/dd/yyyy');
  var sql = "INSERT INTO tbl_ItemLog(ItemID, PersonFirstName, PersonLastName, DateBorrowed, DueBackBy, DateReturned, hasReturned) VALUES (?,?,?,?,?,?,?)" +
  ";UPDATE tbl_Item SET isAvailable=? WHERE ItemID=?";
  var inserts = [id, firstName, lastName, datetime, dueDate, '', false, false, id];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err) { return next(err); }

    res.end('The item has been checked out');
  });
}

exports.return = function(req, res, next){
  const id = req.params.id;

  var curDate = new Date();
  var datetime = dateformat(curDate, 'mm/dd/yyyy');
  var sql = "UPDATE tbl_ItemLog SET DateReturned=?, hasReturned=? WHERE ItemID=?"
    + ";UPDATE tbl_Item SET isAvailable=? WHERE ItemID=?";
  var inserts = [datetime, true, id, true, id];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err) { return next(err); }

    res.send('The item has been returned')
  }, req.params.id);
}

exports.editItem = function(req, res, next){
  const ItemType = req.body.ItemType;
  const ItemName = req.body.ItemName;
  const AdditionalInfo = req.body.AdditionalInfo;

  if(!ItemType || !ItemName){
    return res.status(422).send({ error: 'The item name and type cannot be blank!' });
  }

  var sql = "UPDATE tbl_Item SET ItemType=?, ItemName=?, AdditionalInfo=? WHERE ItemID=?"
  var inserts = [ItemType, ItemName, AdditionalInfo, req.params.id];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err){ return next(err); }

    res.end('The item has been updated');
  }, req);
}

exports.MarkOverdue = function(id){
  var sql = "UPDATE tbl_Item SET isOverdue=? WHERE ItemID=?"
  var inserts = [1, id];
  sql = mysql.format(sql, inserts);

  db.queryPostSQL(sql, function(err){
    if(err){ return err; }
    // console.log('The item has been marked as overdue');
  })
}
