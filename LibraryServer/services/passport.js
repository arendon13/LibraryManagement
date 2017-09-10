const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mysql = require('mysql');
const pool = mysql.createPool(config.database);


// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.auth.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  var sql = "SELECT * FROM tbl_User WHERE Email=?";
  var inserts = [payload.sub];
  sql = mysql.format(sql, inserts);
  console.log(sql);

  querySQL(sql, function(err, result){
    if(err){ return done(err, false); }

    // if email exists in db, call done with that user
    console.log('After Query: ' + result);
    if(result.length > 0){
      var userinfo = result[0];
      var user = {
        email: userinfo.Email,
        password: userinfo.Password
      }

      done(null, user);
    } else{
      done(null, false);
    }
  });
});

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

passport.use(jwtLogin);
