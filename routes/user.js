// const passport = require('passport');
// const passportConfig = require('../config/passport')

module.exports = (app) =>{
  app.get('/', (req, res,next)=>{
    res.render('index', {title: 'signup || rate me'});
  });

  app.get('/signup',(req,res)=> {
    res.render('user/signup', {title: 'signup || rate me'})
  })

  app.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/login',(req,res)=> {
    res.render('user/login', {title: 'login || rate me'})
  })
}
