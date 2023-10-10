import axios from 'axios';

const useApiClient = (options?: { baseURL?: string }) => {
  const client = axios.create({
    baseURL: options?.baseURL ?? 'http://18.142.253.100/api/',
    responseType: 'json',
    timeout: 30000,
  });

  return {
    client,
  };
};

export default useApiClient;
