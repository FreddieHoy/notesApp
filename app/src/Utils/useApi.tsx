import axios from "axios";

export const useApi = () => {
  const instance = axios.create({
    baseURL: "https://localhost/api",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return instance;
};
