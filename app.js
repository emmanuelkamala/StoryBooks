const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load config

dotenv.config({path: './config/config.env'});

//Connect to Database
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App started at PORT: ${PORT}`));