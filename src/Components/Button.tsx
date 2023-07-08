import { ButtonHTMLAttributes, forwardRef, Ref } from "react";

const classes = {
  base: "flex border-0 focus:outline-none rounded text-lg justify-center items-center h-fit",
  size: {
    small: "py-2 px-4 text-sm",
    medium: "py-2 px-6 text-base",
    large: "py-2 px-8 text-lg",
  },
  intent: {
    primary: "text-white bg-indigo-500 hover:bg-indigo-600",
    secondary: "bg-indigo-100 text-black hover:bg-indigo-200",
    minimal: "hover:text-indigo-600 px-0 py-0",

    danger: "text-white bg-red-600 hover:bg-red-800",
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

export const cls = (input: string) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();
