import { useState } from "react";
import type { LoginView } from "../App";
import { Input } from "../Components";
import { Button } from "../Components/Button";
import { useApi } from "../Utils/useApi";

export const Register = ({ setView }: { setView: (val: LoginView) => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const api = useApi();

  const onSubmit = async () => {
    setLoading(true);
    await api
      .post("/register", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        setLoading(false);
        setView("login");
      })
      .catch((err) => {
        setLoading(false);
        console.warn(err);
      });
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center box-border">
      <section className="text-gray-600 body-font">
        <div className="bg-gray-100 rounded-lg p-8 flex flex-col">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Register</h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <Input
              name="name"
              className="border"
              type="name"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <Input
              name="email"
              className="border"
              type="email"
              id="email"
              placeholder="John@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <Input
              name="password"
              className="border"
              type="password"
              id="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">
              Confirm Password
            </label>
            <Input
              name="confirmPassword"
              className="border"
              type="password"
              id="confirmPassword"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {loading && <p>Loading...</p>}
          <Button onClick={() => onSubmit()} type="button">
            Register
          </Button>
          <p className="text-xs text-gray-500 mt-3">Already have an account?</p>
          <Button onClick={() => setView("login")} intent={"secondary"} size="small" fullWidth>
            Login here
          </Button>
        </div>
      </section>
    </div>
  );
};
