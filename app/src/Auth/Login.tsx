import { useState } from 'react';
import { type LoginView } from '../App';
import { Button, Input } from '../Components';
import { P } from '../Components/Typography';
import { useLogin } from '../client';
import { IAccount } from '../types';

export const Login = ({
  setView,
  setUser,
}: {
  setView: (val: LoginView) => void;
  setUser: (user: IAccount) => void;
}) => {
  const { isLoading, mutate: login, error } = useLogin();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    if (!email) return;
    login({ email: email, password: password }, { onSuccess: (res) => setUser(res) });
  };

  console.log(isLoading, !email, !password);

  return (
    <>
      <h2 className="title-font mb-5 text-lg font-medium text-gray-900">Login</h2>
      <div className="relative mb-4 border-t-2 pt-2">
        <label htmlFor="email" className="text-sm leading-7 text-black">
          Email
        </label>
        <Input
          name="email"
          type="email"
          id="email"
          placeholder="John@doe.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="text-sm leading-7 text-black">
          Password
        </label>
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4 flex flex-col gap-2 border-b-2 pb-4">
        <P intent="error">{error ? 'Failed logging in.' : null}</P>
        <Button
          loading={isLoading}
          disabled={isLoading || !email || !password}
          onClick={() => onSubmit()}
          type="button"
          fullWidth
        >
          Login
        </Button>
      </div>
      <div className="flex w-full items-center gap-1">
        <P>Need an account?</P>
        <Button onClick={() => setView('register')} intent="minimal" size="small">
          Register here
        </Button>
      </div>
    </>
  );
};
