import { HTMLAttributes } from "react";

export const CardWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={
        "flex flex-col absolute h-80 ... w-1/2 ...  align-center bg-grey-100 text-sky-900/100 rounded-md border border-gray-800"
      }
    >
      {props.children}
    </div>
  );
};

export const CardHeader = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={"flex bg-blue-300 rounded-t-md px-6 py-2 justify-center"}
    >
      {props.children}
    </div>
  );
};

export const CardBody = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={
        "flex px-6 flex-col grow justify-center bg-blue-100 border-y border-sky-800"
      }
    >
      {props.children}
    </div>
  );
};

export const CardFooter = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={"flex w-full px-6 py-2 border-t gap-1 items-center"}
    >
      {props.children}
    </div>
  );
};
