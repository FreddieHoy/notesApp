import cn from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import { P } from './Typography';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
  touched?: boolean;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, wrapperClassName, touched, ...props }, ref) => {
    return (
      <div className={cn('relative', wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm leading-7 text-black">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
            className,
          )}
          {...props}
        />
        {error && touched && (
          <P intent="error" className="mt-1">
            {error}
          </P>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
