'use client';

import useAuthService from '@services/auth-service';
import Login from './components/login';
import Bingo from './components/bingo';

const Home = () => {
  const authService = useAuthService();

  return (
    <>
      {authService.isAuthenticated && <Bingo authService={authService} />}
      {!authService.isAuthenticated && <Login authService={authService} />}
    </>
  );
};

export default Home;
