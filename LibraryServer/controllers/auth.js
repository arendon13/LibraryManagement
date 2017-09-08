const jwt = require('jwt-simple');
const config = require('../config');
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');

const pool = mysql.createPool(config.database);

function tokenForuser(email){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: email, iat: timestamp }, config.auth.secret);
}


exports.signup = function(req, res, next){
  const email = req.body.email;
  var password = req.body.password;

  if(!email || !password){
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  var sql = "SELECT * FROM tbl_User WHERE Email=?";
  var inserts = [email];
  sql = mysql.format(sql, inserts);

  querySQL(sql, function(err, result){
    if(err) { return next(err); }

    // if email exists in db, return an error
    if(result.length > 0){
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if user with email does not exist, create and save the record
    encryptPassword(password, function(passwordEncrypt){
      var sql2 = "INSERT INTO tbl_User(Email, Password) VALUES (?,?)";
      var inserts2 = [email, passwordEncrypt];
      sql2 = mysql.format(sql2, inserts2);

      querySQL(sql2, function(){
        if(err) { return next(err); }

        // Respond to request and indicate the user was created
        res.json({ token: tokenForuser(email) });
      });
    });
  });
}

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

function encryptPassword(password, callback){
  return bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    bcrypt.hash(password, salt, null, function(err, hash){
      if(err) { return next(err); }

      password = hash;
      callback(password);
    });
  });
}
