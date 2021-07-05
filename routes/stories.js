const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Story = require('../models/Story');
// add stories

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
})

router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id; 
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.log(err);
    res.render('error/500');
  }
})

module.exports = router;
