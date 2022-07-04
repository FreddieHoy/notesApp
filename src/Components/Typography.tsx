import { ReactNode } from "react";
import { cls } from "./Button";

export const P = ({ children }: { children: ReactNode }) => {
  return <p className="dark:text-white bg-none">{children}</p>;
};

export const H1 = ({
  children,
  underline,
}: {
  children: ReactNode;
  underline?: "primary" | "success" | "fail";
}) => {
  return (
    <h1 className="dark:text-white bg-none text-xl white-space-nowrap w-fit z-10">
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
