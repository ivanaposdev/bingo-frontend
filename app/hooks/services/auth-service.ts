import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import useApiClient from '@api/api-client';

const useAuthService = () => {
  const { client } = useApiClient();

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const login = async (
    name: string,
    password: string,
    config?: AxiosRequestConfig
  ) => {
    const _config = {
      url: `auth`,
      method: 'POST',
      data: {
        name,
        password,
      },
    };

    setIsLoading(true);

    try {
      const res = await client.request({ ...config, ..._config });
      setToken(res.data);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (e: any) {
      if (e.response.status === 422) {
        setIsError(true);
        setMessage(e.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    password: string,
    config?: AxiosRequestConfig
  ) => {
    const _config = {
      url: `auth/register`,
      method: 'POST',
      data: {
        name,
        password,
      },
    };

    setIsLoading(true);
    try {
      await client.request({ ...config, ..._config });
      setIsLoading(false);
    } catch (e: any) {
      if (e.response.status === 422) {
        setIsError(true);
        setMessage(e.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
  };

  const clear = () => {
    setIsError(false);
    setMessage('');
    setIsLoading(false);
  };

  return {
    isLogin,
    isLoading,
    isError,
    isAuthenticated,
    message,
    token,
    login,
    register,
    clear,
    toggleLoginRegister,
  };
};

export default useAuthService;
