
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Box, Alert, Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
axios.defaults.withCredentials = true;

const SignInForm = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [tabValue, setTabValue] = useState(0); // 0: Sign In, 1: Sign Up

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("")

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/users/auth',
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if(res.data){
        const root = document.documentElement;
        root.style.setProperty('--primary-color', res.data.themecolor);
        root.style.setProperty('--background-color', res.data.themecolor);
        navigate('/dashboard'); 
        dispatch(setCredentials({ ...res.data }));
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/users/',
        {
          username,
          password,
        },
        { withCredentials: true }
      ).then((res) => {
        console.log('response',res.data)
        setResponse(res.data.message)
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
        console.log("res...",res.data)
      })
      .catch((error) => {
        console.log("res...",error)
        setResponse(error.response.data.message)
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      })
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
              label="username"
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
              label="username"
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
        <Alert onClose={handleClose} severity="warning">
         {response}
        </Alert>
      </Snackbar>
      </Grid>
    </Grid>
  );
};

export default SignInForm;

