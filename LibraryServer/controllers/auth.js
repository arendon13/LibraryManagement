const jwt = require('jwt-simple');
const config = require('../config');
const mysql = require('mysql');
const db = require('../services/database');

function tokenForuser(email){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: email, iat: timestamp }, config.auth.secret);
}

exports.signin = function(req, res, next){
  res.send({ token: tokenForuser(req.body.email) })
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

  db.queryGetSQL(sql, function(err, result){
    if(err) { return next(err); }

    // if email exists in db, return an error
    if(result.length > 0){
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if user with email does not exist, create and save the record
    db.encryptPassword(password, function(passwordEncrypt){
      var sql2 = "INSERT INTO tbl_User(Email, Password) VALUES (?,?)";
      var inserts2 = [email, passwordEncrypt];
      sql2 = mysql.format(sql2, inserts2);

      db.queryPostSQL(sql2, function(){
        if(err) { return next(err); }

        // Respond to request and indicate the user was created
        res.json({ token: tokenForuser(email) });
      });
    });
  });
}
