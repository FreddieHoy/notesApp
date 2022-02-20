import React, { useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { Jot } from "./Jot/Home";
import { match } from "ts-pattern";
import { Register } from "./Register";

export type LoginView = "login" | "register";

export const App = () => {
  const isAuth = false;
  const [view, setView] = useState<LoginView>("login");

  if (isAuth) return <Jot />;

  return (
    <div className="flex  h-screen w-screen justify-center items-center">
      {match(view)
        .with("login", () => <Login setView={setView} />)
        .with("register", () => <Register setView={setView} />)
        .exhaustive()}
    </div>
  );
};
