import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Yap = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    text: '',
    image: '',
    video: '',
  });

  const { text, image, video } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/yaps', formData);
      setFormData({ text: '', image: '', video: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Yap
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Text"
            name="text"
            value={text}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            name="image"
            value={image}
            onChange={onChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Video URL"
            name="video"
            value={video}
            onChange={onChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Share Yap
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Yap;