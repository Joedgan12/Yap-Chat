const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  socialMedia: {
    instagram: String,
    tiktok: String,
    snapchat: String,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  yapCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);