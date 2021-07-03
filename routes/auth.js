const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google auth

router.get('/google', passport.authenticate('google', { scope:['profile'] }))

// Google auth callback

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('/dashboard');
  }
)

module.exports = router;
