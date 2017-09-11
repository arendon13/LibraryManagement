const config = require('../config');
const mysql = require('mysql');
const pool = mysql.createPool(config.database);
const bcrypt = require('bcrypt-nodejs');

exports.queryGetSQL = function(sql, callback){
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

exports.queryPostSQL = function(sql, callback){
  pool.getConnection(function(err, connection){
    if(!err){
      connection.query(sql, function(err){
        callback(err);
      });
      connection.release();
    } else{
      console.log("Error connecting to database...\n\n")
    }
  });
}

exports.comparePassword = function(candidatePassword, userPassword, callback){
  bcrypt.compare(candidatePassword, userPassword, function(err, isMatch){
    if(err){ return callback(err); }

    callback(null, isMatch);
  });
}

exports.encryptPassword = function(password, callback){
  return bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    bcrypt.hash(password, salt, null, function(err, hash){
      if(err) { return next(err); }

      password = hash;
      callback(password);
    });
  });
}
