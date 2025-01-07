import { useState } from 'react';
import type { LoginView } from '../App';
import { Input } from '../Components';
import { Button } from '../Components/Button';
import { P } from '../Components/Typography';
import { useRegister } from '../client';

export const Register = ({ setView }: { setView: (val: LoginView) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, mutate: register, error } = useRegister();

  const onSubmit = async () => {
    register(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        onSuccess: () => {
          setView('login');
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <>
      <h2 className="title-font mb-5 text-lg font-medium text-gray-900">Register</h2>
      <div className="relative mb-4 border-t-2 pt-2">
        <label htmlFor="name" className="text-sm leading-7 text-gray-600">
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
        <label htmlFor="email" className="text-sm leading-7 text-gray-600">
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
        <label htmlFor="password" className="text-sm leading-7 text-gray-600">
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

      <div className="mb-4 flex flex-col gap-2 border-b-2 pb-4">
        <P intent="error">{error ? 'Failed logging in.' : null}</P>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={() => onSubmit()}
          type="button"
          fullWidth
        >
          Register
        </Button>
      </div>
      <div className="flex w-full items-center gap-1">
        <P>Already have an account?</P>
        <Button onClick={() => setView('login')} intent="minimal" size="small">
          Login here
        </Button>
      </div>
    </>
  );
};
