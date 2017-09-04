const config = require('../config');
const mysql = require('mysql');

const pool = mysql.createPool(config.database);

exports.addItem = function(req, res, next){
  const itemType = req.body.itemType;
  const itemName = req.body.itemName;

  if(!itemType || !itemName){
    return res.status(422).send({ error: 'You must provide an item type and name!' });
  }

  addItemQuery(function(err, results){
    if(err) { return next(err); }

    console.log(results);
  }, req);
}

function addItemQuery(callback, req){
  var sql = "INSERT INTO tbl_Item(ItemType, ItemName, AdditionalInfo, isAvailable, isOverdue) VALUES (?,?,?,?,?) ";
  var inserts = [req.body.itemType, req.body.itemName, req.body.additionalInfo, true, false];
  sql = mysql.format(sql, inserts);
  console.log(req.body);

  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err, results){
        callback(err, results);
      });
    } else{
      console.log('Error connecting to database...\n\n');
    }
  });
}
