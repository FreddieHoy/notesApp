import { useState } from "react";
import type { LoginView } from "../App";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CardWrapper,
  Input,
} from "../Components";
import { Button } from "../Components/Button";
import { useApi } from "../useApi";

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
        setView("login");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <CardWrapper>
      <CardHeader>
        <h1>Welcome to Jot!</h1>
      </CardHeader>
      <CardBody>
        <form>
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="email">Name:</label>
            <Input
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
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="password">Password:</label>
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
          <div className="px-2 py-1 gap-1 flex">
            <label htmlFor="confirmPassword">Confirm Password:</label>
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
          <Button onClick={() => onSubmit()} type="button">
            Register
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        Already have an account?
        <Button
          onClick={() => setView("login")}
          className="border rounded px-3"
        >
          Login here
        </Button>
      </CardFooter>
    </CardWrapper>
  );
};
