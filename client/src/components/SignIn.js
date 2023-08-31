
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  AppBar,
  Box, Alert, Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../store/slices/usersApiSlice';
import { setThemeColors } from '../store/slices/themeSlice';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
axios.defaults.withCredentials = true;

const SignInForm = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [tabValue, setTabValue] = useState(1); // 0: Sign In, 1: Sign Up
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState('success')
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await login({ username, password });
      const root = document.documentElement;
      root.style.setProperty('--primary-color', data.themecolor);
      root.style.setProperty('--background-color', data.themecolor);
      navigate('/dashboard');
      dispatch(setThemeColors({ primaryColor: data.themecolor, backgroundColor: data.themecolor }));
    } catch (error) {
      setResponse("Error signing in")
      setOpen(true);
      setStatus('warning')
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
    setusername('')
    setPassword('')
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await register({ username, password });
        setResponse(data.message)
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
    } catch (error) {
      
    }
    setusername('')
    setPassword('')
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#f0f0f0' }}>
          <AppBar position="static" color="default">
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <Box hidden={tabValue !== 0}>
            <form onSubmit={handleSignIn}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign In
            </Button>
          </form>
          </Box>
          <Box hidden={tabValue !== 1}>
          <form onSubmit={handleSignUp}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Sign Up
            </Button>
          </form>
          </Box>
        </Paper>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={status}>
         {response}
        </Alert>
      </Snackbar>
      </Grid>
    </Grid>
  );
};

export default SignInForm;

