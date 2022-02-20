import { useState } from "react";
import type { LoginView } from "./App";

export const Login = ({ setView }: { setView: (val: LoginView) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex flex-col absolute h-80 ... w-1/2 ...  align-center bg-grey-100 text-sky-900/100 rounded-md border ">
      <div className="flex bg-blue-300 rounded-t-md px-6 py-2 justify-center">
        <h1>Welcome to Jot!</h1>
      </div>
      <div className="flex px-6 flex-col items-center grow justify-center gap-4">
        <form action="/LOCALHOSTTODOOOOOOOOOO" method="post">
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              className="border"
              type="email"
              id="email"
              placeholder="John@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="password"> Password:</label>
            <input
              name="password"
              className="border"
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={() => onSubmit()} type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="flex w-full px-2 py-2 border-t gap-1 ">
        Need an account?{" "}
        <button
          onClick={() => setView("register")}
          className="border rounded px-3"
        >
          Register here
        </button>
      </div>
    </div>
  );
};
