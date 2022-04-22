import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi } from "./useApi";

type UserAuth = {
  userId?: string;
  token?: string;
};

const setUser = (user: UserAuth) => {
  user.token && localStorage.setItem("token", user.token);
  user.userId && localStorage.setItem("userId", user.userId);
};

const getUser = (): UserAuth => {
  const token = localStorage.getItem("token") || undefined;
  const userId = localStorage.getItem("userId") || undefined;
  return { token, userId };
};

const removeUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const auth = {
  setUser,
  getUser,
  removeUser,
};

type AuthContent = {
  isAuthed: boolean;
  userId: string | undefined;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

const Authcontext = createContext<AuthContent>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const userAuth = getUser();
  const api = useApi();
  const [user, setUser] = useState<UserAuth | undefined>(userAuth);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api
        .get("/notes")
        .catch((e) => {
          console.log("error", e);
        })
        .then(() => {});
    };

    fetchData();
  }, []);

  const login = (token: string, userId: string) => {
    const newUser = { token, userId };
    auth.setUser(newUser);
    return setUser(newUser);
  };

  const logout = () => {
    auth.removeUser();
    return setUser(undefined);
  };

  const value: AuthContent = {
    login,
    logout,
    userId: user?.userId,
    isAuthed: !!user?.token,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export const useAuth = () => useContext(Authcontext);
