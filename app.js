const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
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
app.use(passport.session());

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`)); 