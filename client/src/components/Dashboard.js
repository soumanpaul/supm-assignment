// Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { logout } from '../store/slices/authSlice';
import { useLogoutMutation, useUserProfileMutation} from '../store/slices/usersApiSlice'
import { useSelector, useDispatch } from 'react-redux';


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

  const [logoutApiCall] = useLogoutMutation();
  const [userProfile] = useUserProfileMutation()
  const dispatch = useDispatch();
  const { primaryColor } = useSelector((state) => state.theme);



  React.useEffect(() => {
    async function fetchData(){
      let {data} =  await userProfile();
      const root = document.documentElement;
      if(data){
        root.style.setProperty('--primary-color', data.themecolor);
        root.style.setProperty('--background-color', data.themecolor);
    }
    }
    fetchData();
  },[primaryColor])

  const handleLogout = async () => {
    localStorage.removeItem('userInfo')
    
    await logoutApiCall().unwrap();
    dispatch(logout());

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
