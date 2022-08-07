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
import { NewNote } from "./Jot/NewNote";
import { Notes } from "./Jot/Notes";
import { Stack } from "./Components/Stack";

export type Page = "tasks" | "notes" | "profile" | "note";

export type LoginView = "login" | "register";

export const Providers = () => {
  return (
    <AuthProvider>
      <App />
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
  const [page, setPage] = useState<Page>("tasks");
  // potential reducer for new notes ids etc

  return (
    <Stack className="h-screen overflow-hidden" vertical>
      <Stack vertical grow className="w-full overflow-hidden">
        {match(page)
          .with("tasks", () => <Tasks setPage={setPage} />)
          .with("notes", () => <Notes setPage={setPage} />)
          .with("profile", () => <Profile setPage={setPage} />)
          .with("note", () => <NewNote setPage={setPage} />)
          .exhaustive()}
      </Stack>
      {isMobile && <MobileFooter setPage={setPage} page={page} />}
    </Stack>
  );
};
