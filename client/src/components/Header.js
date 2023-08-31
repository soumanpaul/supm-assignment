import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Alert, Snackbar } from '@mui/material';
import {colorOptions} from '../utils/Colors'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios'
import { useUpdateThemeMutation } from '../store/slices/usersApiSlice'
import { setThemeColors } from '../store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

axios.defaults.withCredentials = true

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState('success')


  const dispatch = useDispatch();
  const [ updateTheme ] = useUpdateThemeMutation()
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleColorChange = async (color) => {   
    const user = JSON.parse(localStorage.getItem('userInfo'))

    try{
      const {data} = await updateTheme({_id: user ? user._id : "",themecolor: color})
      dispatch(setThemeColors({ primaryColor: data.themecolor, backgroundColor: data.themecolor }));
      setResponse(data.message)
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
  }
  catch(error) {
      console.log("res...",error)
      setResponse('Not authorized User')
      setStatus('warning')
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
    handleMenuClose();
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className='app-title' fontWeight="bold" variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Secure User Preference Management Web Application
        </Typography>
        <Button
          color="inherit"
          onClick={handleMenuOpen}
          sx={{
            border: '1px solid #fff',
            backgroundColor: '#1e88e5',
            borderRadius: '4px',
            padding: '6px 16px',
            display: 'flex',
            alignItems: 'center',
          }}
          endIcon={<ArrowDropDownIcon />}
        >
          Color Theme
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {colorOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleColorChange(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={status}>
         {response}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
