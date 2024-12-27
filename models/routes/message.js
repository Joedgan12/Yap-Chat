const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Send a message
router.post('/', auth, async (req, res) => {
  const { recipients, text } = req.body;

  try {
    const newMessage = new Message({
      sender: req.user.id,
      recipients,
      text,
    });

    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      recipients: { $in: [req.user.id] },
    }).sort({ date: -1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;