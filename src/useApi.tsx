import axios from "axios";
import { auth } from "./Auth";

export const useApi = () => {
  const { token } = auth.getUser();
  console.log("token", token);
  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Bearer: token } : {}),
    },
  });
  return instance;
};
