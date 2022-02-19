import { useState } from "react";

export const Login = () => {
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
        <div className="px-2 py-1 gap-1 flex">
          <p>Email:</p>
          <input
            name="email"
            className="border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="px-2 py-1 gap-1 flex">
          <p> Password:</p>
          <input
            name="password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => onSubmit()}>Login</button>
    </div>
  );
};
