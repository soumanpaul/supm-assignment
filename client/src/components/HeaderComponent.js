import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Alert, Snackbar } from '@mui/material';
import {colorOptions} from '../utils/Colors'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios'

axios.defaults.withCredentials = true

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("")


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
    console.log(color)
   
    const user = JSON.parse(localStorage.getItem('userInfo'))
    
    axios.put('http://localhost:8080/api/users/theme',{
      _id: user ? user._id : "",
      themecolor: color
        } ,{ withCredentials: true }).then((res) => {
          console.log('response',res.data)
          if(res.data.status==200){
            const root = document.documentElement;
            root.style.setProperty('--primary-color', color);
            root.style.setProperty('--background-color', color);
          }    
          //  alert(res.data.message)   
          setResponse(res.data.message)
          setOpen(true);
          
          setTimeout(() => {
            setOpen(false);
          }, 2000);
      
          console.log("res...",res.data)
          
        })
        .catch((error) => {
          // alert('error',error.response)
          console.log("res...",error)

          setResponse(error.response.data.message)
          setOpen(true);
          
          setTimeout(() => {
            setOpen(false);
          }, 2000);
      
          // dispatch(userUpdateProfileFail())
        })
    // console.log("status...", res)
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
        <Alert onClose={handleClose} severity="success">
         {response}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;
