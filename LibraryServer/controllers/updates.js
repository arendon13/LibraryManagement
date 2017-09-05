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

  addItemQuery(function(err){
    if(err) { return next(err); }

    res.end('The item has been added')
  }, req);
}

exports.addItemType = function(req, res, next){
  const itemType = req.body.itemType;

  if(!itemType){
    return res.status(422).send({ error: 'You must provide an item type!' });
  }

  addItemTypeQuery(function(err){
    if(err) { return next(err); }

    res.end('The item type has been added');
  }, itemType);
}

exports.checkOut = function(req, res, next){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if(!firstName || !lastName){
    return res.status(422).send({ error: 'You must provide a first and last name!' })
  }

  checkOutQuery(function(err){
    if(err) { return next(err); }

    res.end('The item has been checked out');
  }, req)
}

exports.return = function(req, res, next){
  returnQuery(function(err){
    if(err) { return next(err); }

    res.send('The item has been returned')
  }, req.params.id);
}

exports.editItem = function(req, res, next){
  const itemType = req.body.itemType;
  const itemName = req.body.itemName;

  if(!itemType || !itemName){
    return res.status(422).send({ error: 'The item name and type cannot be blank!' });
  }

  editItemQuery(function(err){
    if(err){ return next(err); }

    res.end('The item has been updated');
  }, req);
}

function addItemQuery(callback, req){
  var sql = "INSERT INTO tbl_Item(ItemType, ItemName, AdditionalInfo, isAvailable, isOverdue) VALUES (?,?,?,?,?) ";
  var inserts = [req.body.itemType, req.body.itemName, req.body.additionalInfo, true, false];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n');
    }
  });
}

function addItemTypeQuery(callback, itemType){
  var sql = "INSERT INTO tbl_ItemType(ItemTypeName) VALUES (?)";
  var inserts = [itemType];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n')
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
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n')
    }
  });
}

function returnQuery(callback, id){
  var curDate = new Date();
  var datetime = dateformat(curDate, 'yyyy-mm-dd hh:MM:ss');
  var sql = "UPDATE tbl_ItemLog SET DateReturned=?, hasReturned=? WHERE ItemID=?"
    + ";UPDATE tbl_Item SET isAvailable=? WHERE ItemID=?";
  var inserts = [datetime, true, id, true, id];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n');
    }
  });
}

function editItemQuery(callback, req){
  var sql = "UPDATE tbl_Item SET ItemType=?, ItemName=?, AdditionalInfo=? WHERE ItemID=?"
  var inserts = [req.body.itemType, req.body.itemName, req.body.additionalInfo, req.params.id];
  sql = mysql.format(sql, inserts);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log('Error connecting to database...\n\n');
    }
  });
}
