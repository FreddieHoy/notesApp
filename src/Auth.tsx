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
        console.log("me res", data);
        if (data) {
          setUser(data[0]);
        }
      })
      .catch((e) => {
        console.log("error", e);
        // window.sessionStorage.removeItem("authToken");
        setUser(undefined);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const login = () => {
    // window.sessionStorage.setItem("authToken", token);
    fetchData();
  };

  const logout = () => {
    setUser(undefined);
    // window.sessionStorage.removeItem("authToken");
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
