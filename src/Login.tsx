import { useState } from "react";
import type { LoginView } from "./App";
import { auth } from "./Auth";
import { useApi } from "./useApi";

export const Login = ({ setView }: { setView: (val: LoginView) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = useApi();

  const onSubmit = async () => {
    await api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        auth.setToken(res.data.token);
        console.log("success", res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div className="flex flex-col absolute h-80 ... w-1/2 ...  align-center bg-grey-100 text-sky-900/100 rounded-md border ">
      <div className="flex bg-blue-300 rounded-t-md px-6 py-2 justify-center">
        <h1>Welcome to Jot!</h1>
      </div>
      <div className="flex px-6 flex-col items-center grow justify-center gap-4 bg-blue-100">
        <form>
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
          <button onClick={() => onSubmit()} type="button">
            Login
          </button>
        </form>
      </div>
      <div className="flex w-full px-2 py-2 border-t gap-1 items-center">
        Need an account?
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
