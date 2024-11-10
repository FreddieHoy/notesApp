import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useApi } from "../Utils/useApi";

type UserAuth = {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
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
  const api = useApi();
  const [user, setUser] = useState<UserAuth | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await api
      .get("/me")
      .then(({ data }) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((e: any) => {
        setUser(undefined);
      });
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchData();
    // Only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => {
    fetchData();
  };

  const logout = () => {
    setUser(undefined);
  };

  const value: AuthContent = {
    login,
    logout,
    me: user,
    isAuthed: !!user?.token,
    isLoadingAuth: loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
