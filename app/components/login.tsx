'use client';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Login = (props: any) => {
  const {
    isLoading,
    isLogin,
    isError,
    message,
    login,
    register,
    clear,
    toggleLoginRegister,
  } = props.authService;

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    clear();
    login(name, password);
  };

  const handleRegister = () => {
    clear();
    register(name, password);
  };

  const handleToggleRegister = () => {
    toggleLoginRegister();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '90vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '35%',
        }}
      >
        <TextField
          label='Name'
          variant='outlined'
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          type='password'
          label='Password'
          variant='outlined'
          value={password}
          onChange={handlePasswordChange}
        />
        <Typography color='red'>{isError && message}</Typography>
        {isLogin && (
          <Button variant='contained' onClick={handleSubmit}>
            Login
          </Button>
        )}
        {!isLogin && (
          <Button variant='contained' color='success' onClick={handleRegister}>
            Register
          </Button>
        )}
        {isLogin && (
          <Typography
            color='blue'
            sx={{ cursor: 'pointer' }}
            onClick={handleToggleRegister}
          >
            No account yet? register here
          </Typography>
        )}
        {!isLogin && (
          <Typography
            color='blue'
            sx={{ cursor: 'pointer' }}
            onClick={handleToggleRegister}
          >
            Already registered? login here
          </Typography>
        )}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default Login;
