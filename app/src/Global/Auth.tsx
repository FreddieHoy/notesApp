import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext } from 'react';
import { IAccount } from '../types';

export const deleteCookies = () => {
  const name = 'authToken';
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export const getUserCookie = (): IAccount | undefined => {
  const userData = Cookies.get('user_data');
  if (!userData) return undefined;

  const userSessionData = JSON.parse(userData) as IAccount;
  return userSessionData;
};

type AuthContent = {
  account: IAccount;
  logout: () => void;
  isLoadingLogout: boolean;
};

const AuthContext = createContext<AuthContent>({} as any);

export const AuthProvider = ({
  children,
  account,
  logout,
  isLoadingLogout,
}: {
  children: ReactNode;
  account: IAccount;
  logout: () => void;
  isLoadingLogout: boolean;
}) => {
  const value: AuthContent = {
    account,
    logout,
    isLoadingLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
