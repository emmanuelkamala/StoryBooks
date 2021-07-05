const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

//Load config
 
dotenv.config({path: './config/config.env'});

// Passport

require('./config/passport')(passport);

//Connect to Database
connectDB();

const app = express(); 

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Handlebars helpers
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/hbs');

// handlebars
app.engine('.hbs', exphbs({helpers: {formatDate, stripTags, truncate, editIcon},
                           defaultLayout: 'main', 
                           extname: '.hbs'
                          })
          );
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'tanzania',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
 
// middleware

app.use(passport.initialize());
app.use(passport.session());

// Set global variable
app.use((req, res, next)=> {
  res.locals.user = req.user || null
  next()
})

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on PORT: ${PORT}`)); 