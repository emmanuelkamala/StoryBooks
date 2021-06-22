const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

//Load config

dotenv.config({path: './config/config.env'});

// Passport

require('./config/passport')(passport);

//Connect to Database
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'tanzania',
  resave: false,
  saveUninitialized: false
}))

// middleware

app.use(passport.initialize());
app.request(passport.session());

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App started at PORT: ${PORT}`));