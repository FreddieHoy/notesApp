import { ButtonHTMLAttributes, forwardRef, Ref } from "react";

const classes = {
  base: "border-0 focus:outline-none rounded text-lg",
  size: {
    small: "py-2 px-8 text-sm",
    medium: "py-2 px-8 text-base",
    large: "py-2 px-8 text-lg",
  },
  intent: {
    primary: "text-white bg-indigo-500 hover:bg-indigo-600",
    secondary: "bg-indigo-100 text-black hover:bg-indigo-200",
  },
};

type ButtonProps = {
  size?: "small" | "medium" | "large";
  intent?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef(
  (
    {
      children,
      type = "button",
      className,
      size = "large",
      disabled = false,
      intent = "primary",
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
        ${classes.base}
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
