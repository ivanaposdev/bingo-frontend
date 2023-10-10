'use client';

import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import useApiClient from '@api/api-client';

const useBingoService = () => {
  const { client } = useApiClient();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(0);
  const [card, setCard] = useState<any>({});
  const [ball, setBall] = useState(['', 0]);
  const [verifyMessage, setVerifyMessage] = useState(
    'Not a valid BINGO sequence!'
  );

  const start = async (token: string, config?: AxiosRequestConfig) => {
    const _config = {
      url: `bingo/start`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true);

    try {
      const res = await client.request({ ...config, ..._config });
      const data = res.data;
      setId(data.id);
      setCard({
        b: data.card.b.split(','),
        i: data.card.i.split(','),
        n: data.card.n.split(','),
        g: data.card.g.split(','),
        o: data.card.o.split(','),
      });
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const mark = async (
    letter: string,
    number: number,
    token: string,
    config?: AxiosRequestConfig
  ) => {
    const _config = {
      url: `bingo/${id}/mark/${letter}/${number}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true);

    try {
      const res = await client.request({ ...config, ..._config });
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const pick = async (token: string, config?: AxiosRequestConfig) => {
    const _config = {
      url: `bingo/${id}/pick-a-ball`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true);

    try {
      const res = await client.request({ ...config, ..._config });
      setBall(res.data);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  const verify = async (token: string, config?: AxiosRequestConfig) => {
    const _config = {
      url: `bingo/${id}/verify`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true);

    try {
      const res = await client.request({ ...config, ..._config });
      if (res.data) {
        setVerifyMessage('Congratulations, you won!');
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    id,
    card,
    ball,
    verifyMessage,
    start,
    mark,
    pick,
    verify,
  };
};

export default useBingoService;
