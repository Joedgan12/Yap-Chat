const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Follow a user
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    if (user.following.some((follow) => follow.user.toString() === req.params.id)) {
      return res.status(400).json({ msg: 'Already following this user' });
    }

    user.following.unshift({ user: req.params.id });
    targetUser.followers.unshift({ user: req.user.id });

    await user.save();
    await targetUser.save();

    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Unfollow a user
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    user.following = user.following.filter(
      (follow) => follow.user.toString() !== req.params.id
    );
    targetUser.followers = targetUser.followers.filter(
      (follow) => follow.user.toString() !== req.user.id
    );

    await user.save();
    await targetUser.save();

    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;