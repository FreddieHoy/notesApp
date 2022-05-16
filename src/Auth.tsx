import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi } from "./useApi";

type UserAuth = {
  id?: string;
  token?: string;
};

type AuthContent = {
  isAuthed: boolean;
  userId: string | undefined;
  login: () => void;
  logout: () => void;
};

const Authcontext = createContext<AuthContent>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = useApi();
  const [user, setUser] = useState<UserAuth | undefined>(undefined);

  const fetchData = async () => {
    await api
      .get("/me")
      .then(({ data }) => {
        if (data) {
          setUser(data[0]);
        }
      })
      .catch((e) => {
        console.log("error", e);
        setUser(undefined);
      });
  };

  useEffect(() => {
    fetchData();
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
    userId: user?.id,
    isAuthed: !!user?.token,
  };
  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};

export const useAuth = () => useContext(Authcontext);
