import { HTMLAttributes } from "react";

export const Header = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={"flex  h-40 w-full border-b border-gray-800 box-border"}
    >
      {props.children}
    </div>
  );
};

export const Body = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={"flex flex-grow h-40 w-full box-border overflow-hidden"}
    >
      {props.children}
    </div>
  );
};

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
