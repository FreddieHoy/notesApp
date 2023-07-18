import { ButtonHTMLAttributes, Ref, forwardRef } from "react";
import { cls } from "./StyleUtils";

const classes = {
  base: "flex border-0 focus:outline-none rounded-r-full text-lg items-center h-fit p-2 pl-6 hover:bg-indigo-100 dark:hover:bg-indigo-800",
  active: "bg-indigo-200 dark:bg-gray-800",
};

type ButtonProps = {
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const NavButton = forwardRef(
  (
    { children, type = "button", className, disabled = false, active, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
        ${active ? classes.active : ""}
          ${classes.base}
          ${className}
        `)}
      {...props}
    >
      {children}
    </button>
  )
);
