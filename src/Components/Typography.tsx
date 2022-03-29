import { ReactNode } from "react";

export const P = ({ children }: { children: ReactNode }) => {
  return <p className="dark:text-white bg-none">{children}</p>;
};
