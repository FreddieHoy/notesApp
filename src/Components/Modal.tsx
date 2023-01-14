import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CardBody, CardHeader, CardWrapper } from "./AuthCards";
import { Button } from "./Button";
import { Stack } from "./Stack";

export const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => {
  return (
    <div>
      {isOpen ? (
        <div className="absolute top-0 left-0 w-screen h-screen bg-gray-600/50 z-10 flex items-center justify-center">
          <CardWrapper>
            <CardHeader>
              <h1 className="dark:text-white">{title}</h1>
              <Button onClick={() => onClose()}>Close</Button>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </CardWrapper>
        </div>
      ) : null}
    </div>
  );
};

export const Overlay = ({ children, isOpen }: { children: ReactNode; isOpen: boolean }) => {
  const root = document.getElementById("root");
  return root
    ? createPortal(
        <Stack
          className="absolute top-0 left-0 w-screen h-screen bg-gray-600/50 z-10 flex items-center justify-center"
          align="center"
          justify="center"
        >
          {isOpen ? (
            <div className="absolute h-1/2  z-11 flex items-center justify-center w-1/2">
              {children}
            </div>
          ) : null}
        </Stack>,
        root
      )
    : null;
};
