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

export type Page = "tasks" | "notes" | "profile" | "note";

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
  const { page } = useGlobal();

  return (
    <Stack className="h-screen overflow-hidden" vertical>
      <Stack vertical grow className="w-full overflow-hidden">
        {match(page)
          .with("tasks", () => <Tasks />)
          .with("notes", () => <Notes />)
          .with("profile", () => <Profile />)
          .with("note", () => <NoteForm />)
          .exhaustive()}
      </Stack>
      {isMobile && <MobileFooter />}
    </Stack>
  );
};
