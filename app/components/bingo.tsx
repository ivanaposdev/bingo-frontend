'use client';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import useBingoService from '@services/bingo-service';
import { useState } from 'react';

const bingo = ['b', 'i', 'n', 'g', 'o'];

const Bingo = (props: any) => {
  const { token } = props.authService;

  const {
    isLoading,
    id,
    card,
    ball,
    verifyMessage,
    start,
    mark,
    pick,
    verify,
  } = useBingoService();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [marked, setMarked] = useState<any>([]);

  const handleStart = () => {
    start(token);
  };

  const handlePick = () => {
    pick(token);
  };

  const handleVerify = () => {
    verify(token);
    setIsDialogOpen(true);
  };

  const handleClick = (letter: string, number: number) => {
    const newMarked = [...marked] as any;
    const index = bingo.indexOf(letter);
    if (newMarked[index]) {
      newMarked[index].push(number);
    } else {
      newMarked[index] = [number];
    }

    setMarked(newMarked);

    mark(letter, number, token);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const generateColumns = () => {
    return bingo.map((b) => {
      const index = bingo.indexOf(b);
      return (
        <>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {b.toUpperCase()}
            </Box>
            {card[b]?.map((v: any, i: number) => {
              return (
                <Box
                  key={`${b}-${i}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid gray',
                    padding: '1rem',
                    cursor: 'pointer',
                    background: marked[index]?.includes(v) ? 'gray' : 'white',
                  }}
                  onClick={() => handleClick(b, v)}
                >
                  {v}
                </Box>
              );
            })}
          </Box>
        </>
      );
    });
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
          gap: '1rem',
        }}
      >
        {id === 0 && (
          <Button variant='contained' onClick={handleStart}>
            Start
          </Button>
        )}
        {id !== 0 && (
          <Button variant='contained' onClick={handlePick}>
            Pick a ball
          </Button>
        )}
        {ball[0] !== '' && ball[1] !== 0 && (
          <Typography
            sx={{ display: 'flex', justifyContent: 'center' }}
          >{`Combination: ${(ball[0] as string).toUpperCase()}${
            ball[1]
          }`}</Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {generateColumns()}
        </Box>
        {id !== 0 && (
          <Button variant='contained' color='success' onClick={handleVerify}>
            BINGO!
          </Button>
        )}
      </Box>
      <Dialog
        fullScreen={false}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContent>
          <DialogContentText>{verifyMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default Bingo;
