import classNames from "classnames";
import { useState } from "react";
import { match } from "ts-pattern";
import "./App.css";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { AuthProvider, useAuth } from "./Global/Auth";
import { GlobalProvider, useGlobal } from "./Global/GlobalContext";
import { NoteForm } from "./Jot/NoteForm";
import { Notes } from "./Jot/Notes";
import { NavMenu } from "./Menu/NavMenu";
import { Profile } from "./Profile/Profile";
import { useIsMobile } from "./Utils/IsMobile";

export type LoginView = "login" | "register";

export const Providers = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  );
};

export const App = () => {
  const { isAuthed, isLoadingAuth } = useAuth();
  const [view, setView] = useState<LoginView>("login");

  if (isLoadingAuth) return <>Loading....</>;

  if (isAuthed) return <Jot />;

  return match(view)
    .with("login", () => <Login setView={setView} />)
    .with("register", () => <Register setView={setView} />)
    .exhaustive();
};

const Jot = () => {
  const isMobile = useIsMobile();
  const { pageState } = useGlobal();

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden relative p-0 m-0 dark:bg-gray-800">
        <NavMenu />
        <div className="flex">
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
