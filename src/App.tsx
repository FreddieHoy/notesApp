import { useState } from "react";
import "./App.css";
import { Login } from "./Auth/Login";
import { match } from "ts-pattern";
import { Register } from "./Auth/Register";
import { AuthProvider, useAuth } from "./Auth";
import { Profile } from "./Profile/Profile";
import { useIsMobile } from "./Utils/IsMobile";
import { MobileFooter } from "./MobileFooter.tsx/Footer";
import { Tasks } from "./Jot/Tasks";
import { NoteForm } from "./Jot/NoteForm";
import { Notes } from "./Jot/Notes";
import { Stack } from "./Components/Stack";
import { GlobalProvider, useGlobal } from "./Utils/GlobalContext";
import { NoteProvider } from "./Utils/NoteContext";
import { Overlay } from "./Components/Modal";

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

  return (
    <div className="flex h-screen w-screen justify-center items-center box-border">
      {match(view)
        .with("login", () => <Login setView={setView} />)
        .with("register", () => <Register setView={setView} />)
        .exhaustive()}
    </div>
  );
};

const Jot = () => {
  const isMobile = useIsMobile();
  const { page, noteState } = useGlobal();
  const showNote = noteState.visable;

  console.log("isMobile", isMobile);

  if (isMobile) {
    return (
      <Stack className="h-screen overflow-hidden" vertical>
        <Stack vertical grow className="w-full overflow-hidden">
          {match({ page, showNote })
            .with({ showNote: true }, () => <NoteForm id={noteState.noteId} />)
            .with({ page: "tasks" }, () => <Tasks />)
            .with({ page: "notes" }, () => <Notes />)
            .with({ page: "profile" }, () => <Profile />)
            .exhaustive()}
        </Stack>
        <MobileFooter />
      </Stack>
    );
  }

  return (
    <Stack className="h-screen overflow-hidden">
      <Stack vertical grow className="w-1/2 overflow-hidden">
        {match({ page, isMobile })
          .with({ page: "tasks" }, () => <Tasks />)
          .with({ page: "notes" }, () => <Notes />)
          .with({ page: "profile" }, () => <Profile />)
          .exhaustive()}
      </Stack>
      {showNote && (
        <Overlay isOpen={showNote}>
          <NoteForm id={noteState.noteId} />
        </Overlay>
      )}
    </Stack>
  );
};
