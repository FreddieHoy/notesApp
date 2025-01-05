import classNames from "classnames";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { match } from "ts-pattern";
import "./App.css";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { AuthProvider, deleteCookies } from "./Global/Auth";
import { GlobalProvider, useGlobal } from "./Global/GlobalContext";
import { NoteForm } from "./Jot/NoteForm";
import { Notes } from "./Jot/Notes";
import { NavMenu } from "./Menu/NavMenu";
import { Profile } from "./Profile/Profile";
import { useIsMobile } from "./Utils/IsMobile";
import { useGetMe, useLogout } from "./client";
import { IAccount } from "./types";

export const queryClient = new QueryClient();

export type LoginView = "login" | "register";

const Jotter = () => {
  const isMobile = useIsMobile();
  const { pageState } = useGlobal();

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden relative p-0 m-0 dark:bg-gray-800">
        <NavMenu />
        <div className="flex flex-grow">
          <div
            className={classNames("overflow-hidden flex grow flex-col", {
              "w-full": pageState.page !== "note",
              "w-1/2": pageState.page === "note",
            })}
          >
            {match({ pageState, isMobile })
              .with({ pageState: { page: "notes" } }, { pageState: { page: "note" } }, () => (
                <Notes />
              ))
              .with({ pageState: { page: "profile" } }, () => <Profile />)
              .exhaustive()}
          </div>
          <div
            className={classNames("overflow-hidden flex grow flex-col", {
              "hidden ": pageState.page !== "note",
              "w-1/2": pageState.page === "note",
            })}
          >
            {pageState.page === "note" && <NoteForm id={pageState.noteId} />}
          </div>
        </div>
      </div>
    </>
  );
};

const Providers = ({ user, logout }: { user: IAccount; logout: () => void }) => {
  return (
    <AuthProvider account={user} logout={logout}>
      <GlobalProvider>
        <Jotter />
      </GlobalProvider>
    </AuthProvider>
  );
};

const App = () => {
  const [user, setUser] = useState<IAccount | undefined>(undefined);

  const { isLoading } = useGetMe({
    onSuccess: (user) => setUser(user),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: logout } = useLogout();

  const onLogout = () => {
    setUser(undefined);
    try {
      logout();
    } catch (e) {
      deleteCookies();
    }
    localStorage.clear();
  };

  const [view, setView] = useState<LoginView>("login");

  if (isLoading && !user) return <>Load4ing....</>;

  if (user?.id) return <Providers user={user} logout={onLogout} />;

  return match(view)
    .with("login", () => <Login setView={setView} setUser={setUser} />)
    .with("register", () => <Register setView={setView} />)
    .exhaustive();
};

export const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
