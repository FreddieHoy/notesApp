import { ReactNode } from "react";
import { cls } from "./Button";

const pClasses = {
  base: "dark:text-white bg-none text-sm",
  color: {
    error: "text-red-600",
  },
};

export const P = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: "error";
  className?: string;
}) => {
  return (
    <p
      className={cls(`
        ${pClasses.base}
        ${color ? pClasses.color[color] : undefined}
        ${className}
      `)}
    >
      {children}
    </p>
  );
};

// TODO remove underline
const hStyle = {
  primary: "bg-indigo-300",
  success: "bg-green-400",
  fail: "bg-red-400",
};

const h1Classes = {
  base: "dark:text-white bg-none text-xl white-space-nowrap w-fit p-0 m-0 leading-0",
  color: {
    error: "text-red-600",
  },
};

export const H1 = ({
  children,
  underline,
  className,
}: {
  children: ReactNode;
  underline?: "primary" | "success" | "fail";
  className?: string;
}) => {
  return (
    <h1
      className={cls(`
        ${h1Classes.base}
        ${className}
      `)}
    >
      {children}
      {underline && (
        <div className={cls(`h-[10px] w-full ${hStyle[underline]} relative bottom-3 -z-10`)} />
      )}
    </h1>
  );
};

const h2Classes = {
  base: "dark:text-white bg-none text-lg p-0 m-0 leading-0",
  color: {
    error: "text-red-600",
  },
};

export const H2 = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: "error";
  className?: string;
}) => {
  return (
    <h2
      className={cls(`
        ${h2Classes.base}
        ${color ? h2Classes.color[color] : undefined}
        ${className}
      `)}
    >
      {children}
    </h2>
  );
};

const h3Classes = {
  base: "dark:text-white bg-none text-base p-0 m-0 leading-0 font-semibold",
  color: {
    error: "text-red-600",
  },
};

export const H3 = ({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: "error";
  className?: string;
}) => {
  return (
    <h2
      className={cls(`
        ${h3Classes.base}
        ${color ? h2Classes.color[color] : undefined}
        ${className}
      `)}
    >
      {children}
    </h2>
  );
};
