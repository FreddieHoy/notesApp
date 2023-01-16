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
import { NavManu } from "./Menu/NavManu";
import { NotesMobile } from "./Jot/NotesMobile";

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
  const { isAuthed } = useAuth();
  const [view, setView] = useState<LoginView>("login");

  if (isAuthed) return <Jot />;

  return match(view)
    .with("login", () => <Login setView={setView} />)
    .with("register", () => <Register setView={setView} />)
    .exhaustive();
};

const Jot = () => {
  const isMobile = useIsMobile();
  const { page, noteState } = useGlobal();
  const showNote = noteState.visable;

  if (isMobile) {
    return (
      <Stack className="h-screen overflow-hidden dark:bg-purple-900" vertical>
        <Stack vertical padding={"12px 12px 0 12px"} gap={4}>
          <H1 underline="primary">Jotter</H1>
        </Stack>
        <Stack vertical grow className="w-full overflow-scroll" padding={12}>
          {match({ page, showNote })
            .with({ showNote: true }, () => <NoteForm id={noteState.noteId} />)
            .with({ page: "tasks" }, () => <Tasks />)
            .with({ page: "notes" }, () => <NotesMobile />)
            .with({ page: "profile" }, () => <Profile />)
            .exhaustive()}
        </Stack>
        <MobileFooterMenu />
      </Stack>
    );
  }

  return (
    <>
      <Stack className="h-screen w-screen overflow-hidden relative p-0 m-0">
        <NavManu />
        <Stack>
          <Stack vertical grow className="w-1/2 overflow-hidden" padding={24}>
            {match({ page, isMobile })
              .with({ page: "tasks" }, () => <Tasks />)
              .with({ page: "notes" }, () => <Notes />)
              .with({ page: "profile" }, () => <Profile />)
              .exhaustive()}
          </Stack>
        </Stack>
        {showNote && (
          <Overlay isOpen={showNote}>
            <NoteForm id={noteState.noteId} />
          </Overlay>
        )}
      </Stack>
    </>
  );
};
