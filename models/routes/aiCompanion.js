const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Get positive feedback
router.get('/feedback', auth, (req, res) => {
  const positiveFeedback = [
    "You're doing great!",
    "Keep up the good work!",
    "You're amazing!",
    "Fantastic job!",
    "You're a star!",
  ];

  const randomFeedback = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
  res.json({ feedback: randomFeedback });
});

module.exports = router;