import { ButtonHTMLAttributes } from "react";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        "border border-gray-600 rounded-1 px-3 bg-gray-100 m-2 rounded-lg hover:bg-gray-200 active:bg-gray-100 h-8 flex items-center justify-items-center max-w-fit"
      }
    >
      {props.children}
    </button>
  );
};
