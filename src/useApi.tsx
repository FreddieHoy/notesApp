import axios from "axios";

const backendBaseURL = "http://localhost:8000";

export const useApi = () => {
  const instance = axios.create({
    baseURL: backendBaseURL,
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return instance;
};
