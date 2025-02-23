import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    instagram: '',
    tiktok: '',
    snapchat: '',
  });

  const { username, email, phoneNumber, password, instagram, tiktok, snapchat } = formData;

  const authContext = useContext(AuthContext);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    authContext.register({
      username,
      email,
      phoneNumber,
      password,
      socialMedia: { instagram, tiktok, snapchat },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
            label="Password"
            type="password"
            name="password"
            value={password}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;

