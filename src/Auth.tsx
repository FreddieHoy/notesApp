import { createContext, ReactNode, useContext, useState } from "react";

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export const auth = {
  setToken,
  getToken,
  removeToken,
};

type AuthContent = {
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const Authcontext = createContext<AuthContent>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loggedIn = !!getToken();
  const [isAuthed, setIsAuthed] = useState(loggedIn);

  const login = (token: string) => {
    setToken(token);
    return setIsAuthed(true);
  };

  const logout = () => {
    removeToken();
    return setIsAuthed(false);
  };

  const value: AuthContent = {
    login,
    logout,
    isAuthed,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export const useAuth = () => useContext(Authcontext);
