import { HTMLAttributes } from "react";

export const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={"flex  h-20 w-full border-t border-gray-200 box-border"}
    >
      {props.children}
    </div>
  );
};
