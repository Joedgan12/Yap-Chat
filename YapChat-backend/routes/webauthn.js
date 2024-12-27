const express = require('express');
const router = express.Router();
const { generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse } = require('@simplewebauthn/server');
const User = require('../models/User');

// In-memory store for WebAuthn challenges
const webauthnChallenges = {};

// Registration Options
router.post('/register-options', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const options = generateRegistrationOptions({
    rpName: 'YapChat',
    userID: user.id,
    userName: user.email,
  });

  webauthnChallenges[user.id] = options.challenge;

  res.json(options);
});

// Verify Registration
router.post('/register', async (req, res) => {
  const { email, attestation } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const expectedChallenge = webauthnChallenges[user.id];

  try {
    const verification = await verifyRegistrationResponse({
      credential: attestation,
      expectedChallenge,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
    });

    if (verification.verified) {
      user.webauthnCredential = verification.registrationInfo.credentialPublicKey;
      await user.save();
      res.json({ msg: 'Registration successful' });
    } else {
      res.status(400).json({ msg: 'Verification failed' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Authentication Options
router.post('/auth-options', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const options = generateAuthenticationOptions({
    allowCredentials: [{
      id: user.webauthnCredential.id,
      type: 'public-key',
    }],
  });

  webauthnChallenges[user.id] = options.challenge;

  res.json(options);
});

// Verify Authentication
router.post('/auth', async (req, res) => {
  const { email, assertion } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  const expectedChallenge = webauthnChallenges[user.id];

  try {
    const verification = await verifyAuthenticationResponse({
      credential: assertion,
      expectedChallenge,
      expectedOrigin: 'http://localhost:3000',
      expectedRPID: 'localhost',
      authenticator: {
        credentialPublicKey: user.webauthnCredential,
        counter: user.webauthnCounter,
      },
    });

    if (verification.verified) {
      user.webauthnCounter = verification.authenticationInfo.newCounter;
      await user.save();
      res.json({ msg: 'Authentication successful' });
    } else {
      res.status(400).json({ msg: 'Verification failed' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;