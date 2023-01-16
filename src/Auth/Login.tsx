import { useState } from "react";
import type { LoginView } from "../App";
import { useAuth } from "../Auth";
import { Button, Input } from "../Components";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";

export const Login = ({ setView }: { setView: (val: LoginView) => void }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string>();

  const api = useApi();

  const onSubmit = async () => {
    try {
      setError(undefined);
      await api
        .post("/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log("res", res);
          login();
        });
    } catch (e: any) {
      const message = e.response.data.message;
      if (message) {
        setError(message);
      } else {
        setError("Error connecting");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center box-border">
      <section className="text-gray-600 body-font ">
        <div className="px-5 py-24 flex  items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 ">
            <h1 className="title-font font-medium text-3xl text-gray-900">Welcome to Jotter</h1>
            <p className="leading-relaxed mt-4">The greatest note taking app on the planet</p>
          </div>
          <div className="w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
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
            <P color="error">{error ? error : null}</P>
            <Button onClick={() => onSubmit()} type="button" fullWidth={true}>
              Login
            </Button>
            <p className="text-xs text-gray-500 mt-3">Need an account?</p>
            <Button onClick={() => setView("register")} intent="secondary" size="small" fullWidth>
              Register here
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
