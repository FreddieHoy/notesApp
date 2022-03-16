import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Jot } from "./Jot/Home";
import { match } from "ts-pattern";
import { Register } from "./Register";
import { AuthProvider, useAuth } from "./Auth";

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
    <div className="flex  h-screen w-screen justify-center items-center">
      {match(view)
        .with("login", () => <Login setView={setView} />)
        .with("register", () => <Register setView={setView} />)
        .exhaustive()}
    </div>
  );
};
