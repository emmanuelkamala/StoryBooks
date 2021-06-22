const express = require('express');
const router = express.Router();

// login/landing page - GET request

router.get('/', (req, res) => {
  res.send('Login')
})

// Dashboard page - GET request

router.get('/dashboard', (req, res) => {
  res.send('Dashboard')
})

module.exports = router;
