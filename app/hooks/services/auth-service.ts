'use client';

import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import useApiClient from '@api/api-client';

const useAuthService = () => {
  const { client } = useApiClient();

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      await client.request({ ...config, ..._config });
      setIsLoading(false);
    } catch (e: any) {
      console.log('done');
      if (e.response.status === 422) {
        console.log('status');
        setIsError(true);
        setMessage(e.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const clear = () => {
    setIsError(false);
    setMessage('');
    setIsLoading(false);
  };

  return {
    isLoading,
    isError,
    message,
    login,
    clear,
  };
};

export default useAuthService;
