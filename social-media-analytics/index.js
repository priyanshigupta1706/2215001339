const express = require('express');
const axios = require('axios');
const app = express();

const API_URL = "http://20.244.56.144/evaluation-service";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTY0MDkyLCJpYXQiOjE3NDQ5NjM3OTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmMTEzYmM1LWE2M2YtNGVhZC1iZTMwLTZkNzBiYjAyN2MzYyIsInN1YiI6InByaXlhbnNoaS5ndXB0YV9jczIyQGdsYS5hYy5pbiJ9LCJlbWFpbCI6InByaXlhbnNoaS5ndXB0YV9jczIyQGdsYS5hYy5pbiIsIm5hbWUiOiJwcml5YW5zaGkgZ3VwdGEiLCJyb2xsTm8iOiIyMjE1MDAxMzM5IiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiZGYxMTNiYzUtYTYzZi00ZWFkLWJlMzAtNmQ3MGJiMDI3YzNjIiwiY2xpZW50U2VjcmV0IjoiR2NWWEJHUHZVUGprWkhqUCJ9.C_8zsts0DXZutbDIS2ActeKsgagckfPTwBQCJNvmpow"; // Replace with actual token

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
};

// API to fetch posts for a user
app.get('/api/posts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(`${API_URL}/users/${userId}/posts`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'API Error',
      details: error.response?.data || error.message
    });
  }
});

// API to fetch comments for a post
app.get('/api/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'API Error',
      details: error.response?.data || error.message
    });
  }
});

// API to fetch users list
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/users`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'API Error',
      details: error.response?.data || error.message
    });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
