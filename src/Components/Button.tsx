import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import { cls } from "./StyleUtils";

const classes = {
  base: "flex focus:outline-none rounded text-lg justify-center items-center h-fit transition-all duration-400 dark:border-gray-600",
  size: {
    small: "py-2 px-4 text-sm",
    medium: "py-2 px-6 text-base",
    large: "py-2 px-8 text-lg",
  },
  intent: {
    primary: "text-white bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-l",
    secondary:
      "text-gray-500 border border-gray-200 hover:border-gray-400 hover:bg-gray-100 hover:text-black dark:hover:bg-indigo-700 dark:text-gray-200",
    minimal: "hover:text-indigo-600 px-0 py-0 border-0",
    danger: "border border-red-600 text-red-600 hover:bg-red-100",
  },
  width: {
    fit: "w-fit",
    full: "w-full",
  },
  active: "text-indigo-600",
};

type ButtonProps = {
  size?: "small" | "medium" | "large";
  intent?: "primary" | "secondary" | "minimal" | "danger";
  fullWidth?: boolean;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (
    {
      children,
      type = "button",
      className,
      size = "medium",
      disabled = false,
      intent = "primary",
      fullWidth = false,
      active,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
      ${active ? classes.active : ""}
        ${classes.base}
        ${fullWidth ? classes.width.full : classes.width.fit}
        ${classes.size[size]}
        ${classes.intent[intent]}
        ${className}
      `)}
      {...props}
    >
      {children}
    </button>
  )
);
