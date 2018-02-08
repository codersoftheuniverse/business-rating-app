const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
var session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');






var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('http://localhost:3000/ratemysalon')
require('./config/passport');


app.use(express.static('public'));


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
  secret: 'thisismytestkey',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection: mongoose.connection})
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/user')(app);

app.listen(3000, ()=>{
  console.log('running');
})
