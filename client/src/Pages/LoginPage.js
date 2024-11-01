import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Link } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/Mimir_Logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Stack sx={{ backgroundColor: "#1A1D20", height: "100vh" }} alignItems="center" justifyContent="center">
      <Box 
        component="form" 
        onSubmit={handleLogin} 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          width: 300, 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: "#23262A"
        }}
      >
        <img src={Logo} width="200px" style={{ margin: "0 auto" }} />
        
        <Typography variant="h5" color="white" textAlign="center" mb={2}>
          Login
        </Typography>

        
        <TextField
          label="Username"
          variant="outlined"
          color='white'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2, }}
        />
        
        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2, backgroundColor:"#4A9E8F" }}>
          Login
        </Button>

        <Typography color="white" textAlign="center">
          Don't have an account? <Link href="/register" sx={{color:"#4A9E8F"}}>Register here</Link>
        </Typography>
      </Box>
    </Stack>
  );
}
