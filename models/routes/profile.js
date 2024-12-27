const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  const { username, email, phoneNumber, socialMedia, bio, avatar } = req.body;

  // Build profile object
  const profileFields = {};
  if (username) profileFields.username = username;
  if (email) profileFields.email = email;
  if (phoneNumber) profileFields.phoneNumber = phoneNumber;
  if (socialMedia) profileFields.socialMedia = socialMedia;
  if (bio) profileFields.bio = bio;
  if (avatar) profileFields.avatar = avatar;

  try {
    let user = await User.findById(req.user.id);

    if (user) {
      // Update
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      );

      return res.json(user);
    }

    res.status(404).json({ msg: 'User not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;