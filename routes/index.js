const express = require('express');
const router = express.Router();

// login/landing page - GET request

router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// Dashboard page - GET request

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

module.exports = router;
