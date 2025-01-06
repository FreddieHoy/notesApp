import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';
import { cls } from './StyleUtils';

const classes = {
  base: 'flex border-0 focus:outline-none gap-6 w-[180px] rounded-r-full text-lg items-center h-fit p-2 pl-6 hover:bg-gray-300 dark:hover:bg-indigo-800 transition-all duration-400',
  active: 'bg-indigo-200 dark:bg-gray-800',
};

type ButtonProps = {
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const NavButton = forwardRef(
  (
    { children, type = 'button', className, disabled = false, active, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(` ${active ? classes.active : ''} ${classes.base} ${className} `)}
      {...props}
    >
      {children}
    </button>
  ),
);
