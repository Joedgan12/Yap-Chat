const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Yap = require('../models/Yap');
const User = require('../models/User');

// Create a yap
router.post('/', auth, async (req, res) => {
  const { text, image, video } = req.body;

  try {
    const newYap = new Yap({
      user: req.user.id,
      text,
      image,
      video,
    });

    const yap = await newYap.save();
    res.json(yap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all yaps
router.get('/', auth, async (req, res) => {
  try {
    const yaps = await Yap.find().sort({ date: -1 });
    res.json(yaps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like a yap
router.put('/like/:id', auth, async (req, res) => {
  try {
    const yap = await Yap.findById(req.params.id);

    if (yap.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Yap already liked' });
    }

    yap.likes.unshift({ user: req.user.id });
    await yap.save();
    res.json(yap.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Comment on a yap
router.post('/comment/:id', auth, async (req, res) => {
  const { text, emoji } = req.body;

  try {
    const yap = await Yap.findById(req.params.id);

    const newComment = {
      user: req.user.id,
      text,
      emoji,
    };

    yap.comments.unshift(newComment);
    await yap.save();
    res.json(yap.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;