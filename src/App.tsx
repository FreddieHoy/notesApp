import { useState } from "react";
import "./App.css";
import { Login } from "./Auth/Login";
import { match } from "ts-pattern";
import { Register } from "./Auth/Register";
import { AuthProvider, useAuth } from "./Auth";
import { Profile } from "./Profile/Profile";
import { useIsMobile } from "./Utils/IsMobile";
import { MobileFooterMenu } from "./Menu/MobileFooterMenu";
import { Tasks } from "./Jot/Tasks";
import { NoteForm } from "./Jot/NoteForm";
import { Notes } from "./Jot/Notes";
import { Stack } from "./Components/Stack";
import { GlobalProvider, useGlobal } from "./Utils/GlobalContext";
import { NoteProvider } from "./Utils/NoteContext";
import { Overlay } from "./Components/Modal";
import { H1 } from "./Components/Typography";
import { NavMenu } from "./Menu/NavMenu";

export type Page = "tasks" | "notes" | "profile";

export type LoginView = "login" | "register";

export const Providers = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
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
  const { page, noteState } = useGlobal();
  const showNote = noteState.visible;

  if (isMobile) {
    return (
      <Stack className="h-screen overflow-hidden dark:bg-gray-800" vertical>
        <Stack vertical padding={"12px 12px 0 12px"} gap={4}>
          <H1 underline="primary">Jotter</H1>
        </Stack>
        <Stack vertical grow className="w-full overflow-scroll">
          {match({ page, showNote })
            .with({ showNote: true }, () => (
              <NoteForm id={noteState.noteId} isInitiallyToDo={noteState.isInitiallyToDo} />
            ))
            .with({ page: "tasks" }, () => <Tasks />)
            .with({ page: "notes" }, () => <Notes />)
            .with({ page: "profile" }, () => <Profile />)
            .exhaustive()}
        </Stack>
        <MobileFooterMenu />
      </Stack>
    );
  }

  return (
    <>
      <Stack className="h-screen w-screen overflow-hidden relative p-0 m-0 dark:bg-gray-800">
        <NavMenu />
        <Stack vertical grow className="overflow-hidden">
          {match({ page, isMobile })
            .with({ page: "tasks" }, () => <Tasks />)
            .with({ page: "notes" }, () => <Notes />)
            .with({ page: "profile" }, () => <Profile />)
            .exhaustive()}
        </Stack>
        {noteState.visible && (
          <Overlay isOpen={showNote}>
            <section className="text-gray-600 border bg-white shadow-xl body-font w-1/2 max-h-3/4 rounded-lg dark:border-gray-600 dark:bg-gray-800">
              <NoteForm id={noteState.noteId} isInitiallyToDo={noteState.isInitiallyToDo} />
            </section>
          </Overlay>
        )}
      </Stack>
    </>
  );
};
