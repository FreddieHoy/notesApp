import { useState } from "react";
import type { LoginView } from "../App";
import { useAuth } from "../Auth";
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  CardWrapper,
  Input,
} from "../Components";
import { useApi } from "../useApi";

export const Login = ({ setView }: { setView: (val: LoginView) => void }) => {
  const { login } = useAuth();
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
        console.log(res);
        login(); // refetches auth now there is an http auth token
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
        <form className="gap-3">
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
          <Button onClick={() => onSubmit()} type="button">
            Login
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        Need an account?
        <Button onClick={() => setView("register")}>Register here</Button>
      </CardFooter>
    </CardWrapper>
  );
};
