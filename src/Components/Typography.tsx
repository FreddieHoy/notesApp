import { ReactNode } from "react";
import { cls } from "./Button";

const classes = {
  base: "dark:text-white bg-none",
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
        ${classes.base}
        ${color ? classes.color[color] : undefined}
        ${className}
      `)}
    >
      {children}
    </p>
  );
};

export const H1 = ({
  children,
  underline,
}: {
  children: ReactNode;
  underline?: "primary" | "success" | "fail";
}) => {
  return (
    <h1 className="dark:text-white bg-none text-xl white-space-nowrap w-fit ">
      {children}
      {underline && (
        <div
          className={cls(
            `h-[10px] w-full ${style[underline]} relative bottom-3 -z-10`
          )}
        />
      )}
    </h1>
  );
};

const style = {
  primary: "bg-indigo-300",
  success: "bg-green-400",
  fail: "bg-red-400",
};
