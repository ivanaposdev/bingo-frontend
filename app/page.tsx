'use client';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useAuthService from '@services/auth-service';

export default function Home() {
  const { isLoading, isError, message, login, clear } = useAuthService();

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

  useEffect(() => {
    console.log(message);
  }, [isLoading]);

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
          label='Password'
          variant='outlined'
          value={password}
          onChange={handlePasswordChange}
        />
        <Typography color='red'>{isError && message}</Typography>
        <Button variant='contained' onClick={handleSubmit}>
          Login
        </Button>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
}
