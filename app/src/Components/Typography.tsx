import { ReactNode } from 'react';
import { cls } from './StyleUtils';

const pClasses = {
  base: 'dark:text-gray-200 bg-none text-sm',
  error: 'text-red-600',
  placeholder: 'italic text-gray-400 dark:text-gray-400',
};

export const P = ({
  children,
  intent,
  className,
}: {
  children: ReactNode;
  intent?: 'error' | 'placeholder';
  className?: string;
}) => {
  return (
    <p className={cls(` ${pClasses.base} ${intent ? pClasses[intent] : undefined} ${className} `)}>
      {children}
    </p>
  );
};

const underlineStyle = {
  primary: 'bg-indigo-300 dark:bg-indigo-800',
  success: 'bg-green-400',
  fail: 'bg-red-400',
};

const h1Classes = {
  base: 'dark:text-gray-200 bg-none text-xl white-space-nowrap w-fit p-0 m-0 leading-0 relative',
  color: {
    error: 'text-red-600',
  },
};

export const H1 = ({
  children,
  underline,
  className,
}: {
  children: ReactNode;
  underline?: 'primary' | 'success' | 'fail';
  className?: string;
}) => {
  return (
    <span className="relative w-fit">
      <h1 className={cls(` ${h1Classes.base} ${className} ${underline && 'z-10'} `)}>{children}</h1>
      {underline && (
        <div
          className={cls(`h-[10px] w-full ${underlineStyle[underline]} absolute bottom-[1px]`)}
        />
      )}
    </span>
  );
};

const h2Classes = {
  base: 'dark:text-gray-200 bg-none text-lg p-0 m-0 leading-0',
  color: {
    error: 'text-red-600',
  },
};

export const H2 = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: 'error';
  className?: string;
}) => {
  return (
    <h2
      className={cls(
        ` ${h2Classes.base} ${color ? h2Classes.color[color] : undefined} ${className} `,
      )}
    >
      {children}
    </h2>
  );
};

const h3Classes = {
  base: 'dark:text-gray-200 bg-none text-base p-0 m-0 leading-0 font-semibold',
  color: {
    error: 'text-red-600',
  },
};

export const H3 = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: 'error';
  className?: string;
}) => {
  return (
    <h2
      className={cls(
        ` ${h3Classes.base} ${color ? h2Classes.color[color] : undefined} ${className} `,
      )}
    >
      {children}
    </h2>
  );
};
