// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledDashboard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    const root = document.documentElement;
    root.style.setProperty('--primary-color', "#f0eeee");
    root.style.setProperty('--background-color', "#f0eeee");
    navigate('/');
  };

  return (
    <StyledDashboard>
      <h1>Welcome to the Dashboard!</h1>
      <StyledLogoutButton
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </StyledLogoutButton>
    </StyledDashboard>
  );
};

export default Dashboard;
