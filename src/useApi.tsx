import axios from "axios";
import { auth } from "./Auth";

export const useApi = () => {
  const { token } = auth.getUser();

  const instance = axios.create({
    baseURL: "",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: "Bearer " + token } : {}),
    },
  });
  return instance;
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
