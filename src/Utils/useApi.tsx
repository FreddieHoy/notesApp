import axios from "axios";

const backendBaseURL = ""; // We are using a proxy

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
