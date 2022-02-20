import { ButtonHTMLAttributes } from "react";

const buttonStyling = "border rounded-1 ";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={buttonStyling}>
      {props.children}
    </button>
  );
};
