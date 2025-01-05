import axios from 'axios';

export const useApi = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return instance;
};
