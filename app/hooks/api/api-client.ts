import axios from 'axios';

const useApiClient = (options?: { baseURL?: string }) => {
  const client = axios.create({
    baseURL:
      options?.baseURL ?? 'https://d6b4-18-142-253-100.ngrok-free.app/api',
    responseType: 'json',
    timeout: 30000,
  });

  return {
    client,
  };
};

export default useApiClient;
