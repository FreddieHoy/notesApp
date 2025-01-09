import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { type LoginView } from '../App';
import { Button, Input } from '../Components';
import { P } from '../Components/Typography';
import { useLogin } from '../client';
import { IAccount } from '../types';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

export const Login = ({
  setView,
  setUser,
}: {
  setView: (val: LoginView) => void;
  setUser: (user: IAccount) => void;
}) => {
  const { isLoading, mutate: login, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    login(data, { onSuccess: (res) => setUser(res) });
  });

  return (
    <>
      <h2 className="title-font mb-5 text-lg font-medium text-gray-900">Login</h2>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-lg space-y-4">
        <Input
          label="Email"
          {...register('email')}
          type="email"
          id="email"
          placeholder="john@example.com"
          error={touchedFields.email ? errors.email?.message : undefined}
        />
        <Input
          label="Password"
          {...register('password')}
          type="password"
          id="password"
          placeholder="••••••••"
          error={touchedFields.password ? errors.password?.message : undefined}
        />
        <div className="mb-4 flex flex-col gap-2 border-b-2 pb-4">
          <P intent="error">{error ? 'Failed logging in.' : null}</P>
          <Button loading={isLoading} disabled={isLoading || !isValid} type="submit" fullWidth>
            Login
          </Button>
        </div>
        <div className="flex w-full items-center gap-1">
          <P>Need an account?</P>
          <Button type="button" onClick={() => setView('register')} intent="minimal" size="small">
            Register here
          </Button>
        </div>
      </form>
    </>
  );
};
