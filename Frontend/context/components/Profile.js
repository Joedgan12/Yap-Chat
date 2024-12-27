import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    instagram: '',
    tiktok: '',
    snapchat: '',
    bio: '',
    avatar: '',
  });

  const { username, email, phoneNumber, instagram, tiktok, snapchat, bio, avatar } = formData;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', formData);
      authContext.loadUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Instagram"
            name="instagram"
            value={instagram}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="TikTok"
            name="tiktok"
            value={tiktok}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Snapchat"
            name="snapchat"
            value={snapchat}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bio"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Avatar URL"
            name="avatar"
            value={avatar}
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;