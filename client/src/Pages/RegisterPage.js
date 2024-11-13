import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Link } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from "../Assets/Mimir_Logo.png";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/register/`, { username, email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Registration error:', error.message);
      }
    }
  };

  return (
    <Stack sx={{ backgroundColor: "#1A1D20", height: "100vh" }} alignItems="center" justifyContent="center">
      <Box 
        component="form" 
        onSubmit={handleRegister} 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          width: 300, 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: "#23262A",
        }}
      >
        <img src={Logo} width="200px" style={{ margin: "0 auto" }} />
        
        <Typography variant="h5" color="white" textAlign="center" mb={2}>
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          error={!!errors.username}
          helperText={errors.username ? errors.username[0] : ''}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "white" },
              "& fieldset": { borderColor: "#4A9E8F" },
              "&:hover fieldset": { borderColor: "#4A9E8F" },
              "&.Mui-focused fieldset": { borderColor: "#4A9E8F" },
            },
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={!!errors.email}
          helperText={errors.email ? errors.email[0] : ''}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "white" },
              "& fieldset": { borderColor: "#4A9E8F" },
              "&:hover fieldset": { borderColor: "#4A9E8F" },
              "&.Mui-focused fieldset": { borderColor: "#4A9E8F" },
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={!!errors.password}
          helperText={errors.password ? errors.password[0] : ''}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& input": { color: "white" },
              "& fieldset": { borderColor: "#4A9E8F" },
              "&:hover fieldset": { borderColor: "#4A9E8F" },
              "&.Mui-focused fieldset": { borderColor: "#4A9E8F" },
            },
          }}
        />
        
        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2, backgroundColor:"#4A9E8F" }}>
          Register
        </Button>

        <Typography color="white" textAlign="center">
          Already have an account? <Link href="/login" sx={{color:"#4A9E8F"}}>Login here</Link>
        </Typography>
      </Box>
    </Stack>
  );
}
