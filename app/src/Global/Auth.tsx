import { createContext, ReactNode, useContext } from "react";
import { useGetMe } from "../client";

export const deleteCookies = (name = "authToken") => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  localStorage.clear();
};

export type UserAuth = {
  id: string;
  name: string;
  email: string;
};

type AuthContent = {
  isAuthed: boolean;
  isLoadingAuth: boolean;
  me: UserAuth | undefined;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContent>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: me, isLoading, mutate } = useGetMe();

  const logout = () => {
    deleteCookies();
  };

  const login = () => {
    mutate();
  };

  const value: AuthContent = {
    logout,
    login,
    me,
    isAuthed: !!me?.id,
    isLoadingAuth: isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
