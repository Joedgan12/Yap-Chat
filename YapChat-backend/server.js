const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yapchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/webauthn', require('./routes/webauthn'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/yaps', require('./routes/yap'));
app.use('/api/follow', require('./routes/follow'));
app.use('/api/messages', require('./routes/message'));
app.use('/api/aiCompanion', require('./routes/aiCompanion'));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to YapChat API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));