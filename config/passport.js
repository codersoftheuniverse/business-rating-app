const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.serializeUser((user, done)=>{
  done(null, user.id)
});

passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user);
  })
});

passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passRequestToCallBack: true
},(req, email, password, done)=>{
  User.findOne({'email': email}, (err, user)=>{
    if(err){
      return done(err);
    }

    if(user){
      return done(null, false)
    }

    var newUser= new User();
    newUser.fullName = req.body.fullName;
    newUser.email = req.body.email;
    newUser.password = encryptPassword(req.body.password)

    newUser.save((err)=>{
      return done(null, newUser);
    });
  })
}))
