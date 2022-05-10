import axios from "axios";

export const useApi = () => {
  const instance = axios.create({
    baseURL: "",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};
