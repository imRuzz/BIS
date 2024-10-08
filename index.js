const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const view = path.join(__dirname, './view');
const certificates = path.join(__dirname, './view/certificates');

//Passport config
require('./config/passport')(passport)

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', view);
app.set('certs', certificates)

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', require('./routes/page'));
app.use('/users', require('./routes/users'));
app.use('/residentData', require('./routes/residentData'));
app.use('/blotterRoute', require('./routes/blotterRoute'));
app.use('/settingsRoute', require('./routes/settingsRoute'));


const residentData = require('./routes/residentData');
app.use('/residentData', residentData);

const blotterRoute = require('./routes/blotterRoute');
app.use('/blotterRoute', blotterRoute);

const settingsRoute = require('./routes/settingsRoute');
app.use('/settingsRoute', settingsRoute);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/public/images'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));