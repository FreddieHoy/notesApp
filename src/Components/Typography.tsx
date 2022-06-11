import { ReactNode } from "react";

export const P = ({ children }: { children: ReactNode }) => {
  return <p className="dark:text-white bg-none">{children}</p>;
};

export const H1 = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="dark:text-white bg-none text-xl white-space-nowrap">
      {children}
    </h1>
  );
};
