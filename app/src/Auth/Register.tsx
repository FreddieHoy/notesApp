import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { type LoginView } from '../App';
import { Button, Input } from '../Components';
import { P } from '../Components/Typography';
import { useRegister } from '../client';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email',
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'string.empty': 'Please confirm your password',
  }),
});

export const Register = ({ setView }: { setView: (val: LoginView) => void }) => {
  const { isLoading, mutate: register, error } = useRegister();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const { confirmPassword, ...registerData } = data;
    register(registerData, { onSuccess: () => setView('login') });
  });

  return (
    <>
      <h2 className="title-font mb-5 text-lg font-medium text-gray-900">Register</h2>
      <form onSubmit={onSubmit} className="w-full">
        <div className="relative mb-4 border-t-2 pt-2">
          <Input
            label="Name"
            {...registerField('name')}
            type="text"
            id="name"
            placeholder="John Doe"
            error={errors.name?.message}
            touched={touchedFields.name}
          />
        </div>
        <div className="relative mb-4">
          <Input
            label="Email"
            {...registerField('email')}
            type="email"
            id="email"
            placeholder="John@doe.com"
            error={errors.email?.message}
            touched={touchedFields.email}
          />
        </div>
        <div className="relative mb-4">
          <Input
            {...registerField('password')}
            type="password"
            id="password"
            placeholder="******"
            label="Password"
            error={errors.password?.message}
            touched={touchedFields.password}
          />
        </div>
        <div className="relative mb-4">
          <Input
            {...registerField('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="******"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            touched={touchedFields.confirmPassword}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2 border-b-2 pb-4">
          <P intent="error">{error ? 'Failed to register.' : null}</P>
          <Button loading={isLoading} disabled={isLoading || !isValid} type="submit" fullWidth>
            Register
          </Button>
        </div>
      </form>
      <div className="flex w-full items-center gap-1">
        <P>Already have an account?</P>
        <Button onClick={() => setView('login')} intent="minimal" size="small">
          Login here
        </Button>
      </div>
    </>
  );
};
