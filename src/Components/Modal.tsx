import React, { ReactNode } from "react";
import { CardBody, CardHeader, CardWrapper } from "./AuthCards";
import { Button } from "./Button";

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

export const Overlay = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) => {
  return (
    <div>
      {isOpen ? (
        <div className="absolute top-0 left-0 w-screen h-screen bg-gray-600/50 z-10 flex items-center justify-center">
          {children}
        </div>
      ) : null}
    </div>
  );
};
