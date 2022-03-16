import { useState } from "react";
import type { LoginView } from "./App";
import { useApi } from "./useApi";

export const Register = ({
  setView,
}: {
  setView: (val: LoginView) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const api = useApi();

  const onSubmit = async () => {
    await api
      .post("/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
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
      <div className="flex px-6 flex-col items-center grow justify-center gap-4">
        <form>
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="email">Name:</label>
            <input
              name="name"
              className="border"
              type="name"
              id="name"
              placeholder="John@doe.com"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="password">Password:</label>
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
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              name="confirmPassword"
              className="border"
              type="password"
              id="confirmPassword"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={() => onSubmit()} type="button">
            Register
          </button>
        </form>
      </div>
      <div className="flex w-full px-2 py-2 border-t gap-1 items-center">
        Already have an account?
        <button
          onClick={() => setView("login")}
          className="border rounded px-3"
        >
          Login here
        </button>
      </div>
    </div>
  );
};
