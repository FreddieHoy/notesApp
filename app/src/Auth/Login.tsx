import { useState } from "react";
import { type LoginView } from "../App";
import { Button, Input } from "../Components";
import { P } from "../Components/Typography";
import { useLogin } from "../client";
import { IAccount } from "../types";

export const Login = ({
  setView,
  setUser,
}: {
  setView: (val: LoginView) => void;
  setUser: (user: IAccount) => void;
}) => {
  const { isLoading, mutate: login, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    login(
      {
        email: email,
        password: password,
      },
      { onSuccess: (res) => setUser(res) }
    );
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center box-border">
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 flex items-center">
          <div className="flex flex-col pr-6">
            <h1 className="title-font font-medium text-lg text-gray-900">Welcome to Jotter</h1>
            <p className="leading-relaxed mt-4">The greatest note taking app on the planet</p>
          </div>
          <div className="min-w-[400px] bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="John@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex flex-col gap-2">
              <P intent="error">{error ? "Failed logging in." : null}</P>
              <Button onClick={() => onSubmit()} type="button" fullWidth={true}>
                Login
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Need an account?</p>
            <Button
              loading={isLoading}
              onClick={() => setView("register")}
              intent="secondary"
              size="small"
              fullWidth
            >
              Register here
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
